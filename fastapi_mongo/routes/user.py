from bson.objectid import ObjectId
from fastapi import APIRouter,Depends, HTTPException

from models.user import Login, User
from config.db import conn
from schemas.user import userEntity, usersEntity
import pandas as pd
from auth import AuthHandler

user = APIRouter()
auth_handler = AuthHandler()

@user.get('/', tags=["users"])
async def find_all_users():
    print(conn.local.user.find()) 
    print(usersEntity(conn.local.user.find()))
    return usersEntity(conn.local.user.find())

@user.post('/login', tags=["users"])
async def get_user_by_id(login: Login):
    print(login.email)
    user = conn.local.user.find_one({"email":login.email})
    if (user is None) or (not auth_handler.verify_password(login.password, user['password'])):
        raise HTTPException(status_code=401, detail='Invalid username and/or password')
    token = auth_handler.encode_token(user['email'])
    return { 'token': token , 'email': user['email'], 'name': user['name']}

@user.post('/register',tags=["users"])
async def create_user(user: User):
    user.password = auth_handler.get_password_hash(user.password)
    isUserExists = conn.local.user.find_one({"email":user.email})
    if isUserExists is not None:
        raise HTTPException(status_code=400, detail='User already exists')
    conn.local.user.insert_one(dict(user))
    token = auth_handler.encode_token(user.email)
    return { 'token': token , 'email': user.email, 'name': user.name }

@user.put('/{id}',tags=["users"])
async def update_user(id, user: User):
    conn.local.user.find_one_and_update({"_id":ObjectId(id)}, {
        "$set":dict(user)
    })
    return usersEntity(conn.local.user.find_one({"_id":ObjectId(id)}))

@user.delete('/{id}', tags=["users"])
async def create_user(id):
    return usersEntity(conn.local.user.find_one_and_delete({"_id":ObjectId(id)}))





