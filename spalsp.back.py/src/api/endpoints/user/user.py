from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.user import User, UserCreate, UserUpdate
from src.api.endpoints.user import functions as user_functions

user_module = APIRouter()


# @user_module.get('/')
# async def read_auth_page():
#     return {"msg": "Auth page Initialization done"}


@user_module.post('/', response_model=User)
async def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = user_functions.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    new_user = user_functions.create_new_user(db, user)
    return new_user


@user_module.get('/',
                 response_model=list[User],
                 # dependencies=[Depends(RoleChecker(['admin']))]
                 )
async def read_all_user(
                        
                        db: Session = Depends(get_db)):
    return user_functions.read_all_user(db)


@user_module.get('/{user_id}',
                 response_model=User,
                 # dependencies=[Depends(RoleChecker(['admin']))]
                 )
async def read_user_by_id(user_id: int, db: Session = Depends(get_db)):
    return user_functions.get_user_by_id(db, user_id)


@user_module.patch('/{user_id}',
                   response_model=User,
                   #   dependencies=[Depends(RoleChecker(['admin']))]
                   )
async def update_user(user_id: int,
                      user: UserUpdate,
                      db: Session = Depends(get_db)):
    print(f"Received data: {user.model_dump()}")
    return user_functions.update_user(db, user_id, user)


@user_module.delete('/{user_id}',
                    #    response_model=User,
                    #    dependencies=[Depends(RoleChecker(['admi
                    )
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    return user_functions.delete_user(db, user_id)
