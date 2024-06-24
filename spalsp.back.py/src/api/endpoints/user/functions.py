from fastapi import HTTPException, status, Depends
from typing import Annotated
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from passlib.context import CryptContext
from jose import JWTError, jwt

from src.models import user as UserModel
from src.schemas.user import Token, UserCreate, UserLogin, UserUpdate
from src.core.config import SECRET_KEY, ALGORITHM
from src.core.dependencies import get_db, oauth2_scheme

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# get user by email 
def get_user_by_email(db: Session, email: str):
    return db.query(UserModel.User).filter(UserModel.User.email == email).first()

# get user by id
def get_user_by_id(db: Session, user_id: int):
    db_user = db.query(UserModel.User).filter(UserModel.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# crete new user 
def create_new_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    new_user = UserModel.User(email=user.email, password=hashed_password, first_name=user.first_name, last_name=user.last_name, role_id=user.role_id)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# get all user 
def read_all_user(db: Session):
    return db.query(UserModel.User).all()

# update user
def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = get_user_by_id(db, user_id)
    updated_data = user.model_dump(exclude_unset=True) # partial update
    for key, value in updated_data.items():
        setattr(db_user, key, value)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# delete user
def delete_user(db: Session, user_id: int):
    db_user = get_user_by_id(db, user_id)
    db.delete(db_user)
    db.commit()
    # db.refresh(db_user)
    return {"msg": f"{db_user.email} deleted successfully"}

# =====================> login/logout <============================
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, user: UserLogin):
    member = get_user_by_email(db, user.email)
    if not member:
        return False
    if not verify_password(user.password, member.password):
        return False
    return member


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str,
                     db: Annotated[Session, Depends(get_db)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Payload =====> {payload}")
        current_email: str = payload.get("email")
        if current_email is None:
            raise credentials_exception
        user = get_user_by_email(db, current_email)
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception
