from collections import defaultdict
import json
from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import path as PathModel
from src.schemas.smartrepository import CreatePath
from src.models import country as CountryModel
from src.models import style as StyleModel
from src.models import category as CategoryModel
from src.models import domain as DomainModel
from src.models import subdomain as SubdomainModel
from src.models import dictionary as DictionaryModel
from src.models import ontology as OntologyModel
from src.models import document as DocumentModel
from src.models import lsp as LspModel

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_path_by_id(db: Session, path_id: int):
    db_path = db.query(PathModel.Path).filter(
        PathModel.Path.id == path_id
        ).first()
    if db_path is None:
        raise HTTPException(status_code=404, detail="Path not found")
    return db_path


def create_new_path(db: Session, path: CreatePath):
    new_path = PathModel.Path(country_id=path.country_id,
                              style_id=path.style_id,
                              category_id=path.category_id,
                              domain_id=path.domain_id,
                              subdomain_id=path.subdomain_id,
                              user_id=path.user_id
                              )
    db.add(new_path)
    db.commit()
    db.refresh(new_path)
    return new_path


def read_all_path(db: Session):
    return db.query(PathModel.Path).all()


def list_to_dict(data):
    return {item.id: item.name for item in data}


def find_or_create_node(arr, node_id, path_id, label, typeOf, prefix: str):
    files = ['ontology', 'dociment', 'lsp', 'dictionary']
    node = next((item for item in arr if typeOf not in files
                 and item['label'] == label), None)
    if not node:
        str_node = prefix+str(path_id)+typeOf + str(node_id)
        node = {'key': str_node, 'path_id': [path_id],
                'label': label, 'type': typeOf, 'descendants': []}
        arr.append(node)
    if node and path_id not in node['path_id']:
        newnode = node.copy()
        newnode['path_id'].append(path_id)
        arr.remove(node)
        arr.append(newnode)
    return node


def create_struct_tree(db: Session, content: str, prefix: str):
    paths = db.query(PathModel.Path).all()

    country_dict = list_to_dict(db.query(CountryModel.Country).all())
    style_dict = list_to_dict(db.query(StyleModel.Style).all())
    domain_dict = list_to_dict(db.query(DomainModel.Domain).all())
    category_dict = list_to_dict(db.query(CategoryModel.Category).all())
    subdomain_dict = list_to_dict(db.query(SubdomainModel.Subdomain).all())
    ontologies_dict = list_to_dict(db.query(OntologyModel.OntologyRepo).all())
    documents_dict = list_to_dict(db.query(DocumentModel.DocumentRepo).all())
    dictionaries_dict = list_to_dict(db.query(DictionaryModel.DictionaryRepo).all())
    lsps_dict = list_to_dict(db.query(LspModel.LspRepo).all())

    tree = []

    for entry in paths:
        country_id = entry.country_id
        style_id = entry.style_id
        category_id = entry.category_id
        domain_id = entry.domain_id
        subdomain_id = entry.subdomain_id
        user_id = entry.user_id

        country_node = find_or_create_node(tree, country_id,
                                           entry.id, country_dict[country_id],
                                           'country', prefix)
        style_node = find_or_create_node(country_node['descendants'], style_id,
                                         entry.id, style_dict[style_id],
                                         'style', prefix)
        category_node = find_or_create_node(style_node['descendants'],
                                            category_id,
                                            entry.id,
                                            category_dict[category_id],
                                            'category', prefix)
        domain_node = find_or_create_node(category_node['descendants'], domain_id,
                                          entry.id, domain_dict[domain_id],
                                          'domain', prefix)
        subdomain_node = find_or_create_node(domain_node['descendants'],
                                             subdomain_id,
                                             entry.id,
                                             subdomain_dict[subdomain_id],
                                             'subdomain', prefix)
        if content == 'all' or 'documents' in content:
            documents = db.query(DocumentModel.DocumentRepo).filter(
                DocumentModel.DocumentRepo.path_id == entry.id).all()
            for document in documents:
                document_id = document.id
                document_node = find_or_create_node(subdomain_node['descendants'],
                                                    document_id,
                                                    entry.id,
                                                    documents_dict[document_id],
                                                    'document', prefix)
        if content == 'all' or 'lsp' in content:
            lsps = db.query(LspModel.LspRepo).filter(
                LspModel.LspRepo.path_id == entry.id).all()
            for lsp in lsps:
                lsp_id = lsp.id
                lsp_node = find_or_create_node(subdomain_node['descendants'],
                                               lsp_id,
                                               entry.id,
                                               lsps_dict[lsp_id],
                                               'lsp', prefix)
        if content == 'all' or 'dictionaries' in content:
            dictionaries = db.query(DictionaryModel.DictionaryRepo).filter(
                DictionaryModel.DictionaryRepo.path_id == entry.id).all()
            for dictionary in dictionaries:
                dictionary_id = dictionary.id
                dictionary_node = find_or_create_node(subdomain_node['descendants'],
                                                      dictionary_id,
                                                      entry.id,
                                                      dictionaries_dict[dictionary_id],
                                                      'dictionary', prefix)

        if content == 'all' or 'ontologies' in content:
            ontologies = db.query(OntologyModel.OntologyRepo).filter(
                OntologyModel.OntologyRepo.path_id == entry.id).all()
            for ontology in ontologies:
                ontology_id = ontology.id
                ontology_node = find_or_create_node(subdomain_node['descendants'],
                                                    ontology_id,
                                                    entry.id,
                                                    ontologies_dict[ontology_id],
                                                    'ontology', prefix)

        subdomain_node['user_id'] = user_id
    return tree


def read_full_path(db: Session):
    tree = create_struct_tree(db, 'all', 'all')
    return {"content": tree}


def read_full_several_path(objects: str, db: Session):
    tree = create_struct_tree(db, objects, 'some')
    return {"content": tree}


def read_full_structure_path(db: Session):
    tree = create_struct_tree(db, 'none', 'struct')
    return {"content": tree}


def read_full_onto_path(db: Session):
    tree = create_struct_tree(db, 'ontologies', 'onto')
    return {"content": tree}


def read_full_docs_path(db: Session):
    tree = create_struct_tree(db, 'documents', 'docs')
    return {"content": tree}


def read_full_dicts_path(db: Session):
    tree = create_struct_tree(db, 'dictionaries', 'dict')
    return {"content": tree}


def read_full_lsp_path(db: Session):
    tree = create_struct_tree(db, 'lsps', 'lsp')
    return {"content": tree}


def update_path(db: Session, path_id: int,
                path: CreatePath):
    db_path = get_path_by_id(db, path_id)
    updated_data = path.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_path, key, value)
    db.add(db_path)
    db.commit()
    db.refresh(db_path)
    return db_path


def delete_path(db: Session, path_id: int):
    db_path = get_path_by_id(db, path_id)
    db.delete(db_path)
    db.commit()
    return {"msg": f"{db_path.id} deleted successfully"}
