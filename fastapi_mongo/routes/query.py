from bson.objectid import ObjectId
from fastapi import APIRouter, Depends
import pandas as pd
from starlette.responses import JSONResponse
from auth import AuthHandler
from models.queryData import KaggleQuery
from models.queryData import Query, SaveQuery
from azure.storage.blob import *
import io
import pandas as pd
from schemas.azureFunctions import response_json, upload_blob
import time
from config.db import conn
from schemas.query import queriesEntity
from celery import Celery
import uuid
import kaggle
import zipfile
import shutil

query = APIRouter()
auth_handler = AuthHandler()


simple_app = Celery('simple_worker',
                    broker='amqp://admin:mypass@rabbitmq:5672',
                    backend='mongodb://mongodb_container:27017/mydb')

@query.post('/fetch-data', tags=["queries"])
async def fetch_data(query: Query):
    print(query.queryType)
    df=None
    if query.queryType == "head":
        df = pd.read_csv(query.path).head()
    elif query.queryType == "tail":
        df = pd.read_csv(query.path).tail()
    elif query.queryType == "description":
        df = pd.read_csv(query.path).describe()
    elif query.queryType == "all":
        df = pd.read_csv(query.path)
    print(df)

    if (df is not None):
        return JSONResponse(content={
        "data": list(df.to_dict('records')),
        "columns": list(df.columns)
        }, status_code=200)
        
    else:
        return JSONResponse(status_code=404, content={"message": "Something Went wrong"})

@query.post("/save-query", tags=["queries"])
async def upload(query: SaveQuery, email=Depends(auth_handler.auth_wrapper)):
    r = simple_app.send_task('tasks.save_query', kwargs={'path': query.path, 'queryType': query.queryType, 'email':email})
    return response_json(message=r.id, status=200)

@query.get('/saved-queries', tags=["queries"])
async def get_all_queries(email=Depends(auth_handler.auth_wrapper)):
    return queriesEntity(conn.local.query.find({"email": email}))

# @query.post("/save_kaggle_query",tags=["kaggle"])
# def save_kaggle_query(query: KaggleQuery, email=Depends(auth_handler.auth_wrapper)):
#     r = simple_app.send_task('tasks.save_kaggle_query', kwargs={'datasetName':query.datasetName,'fileName':query.fileName, 'queryType':query.queryType, 'email':email})
#     return response_json(message=r.id, status=200)
@query.post("/save_kaggle_query",tags=["kaggle"])
def save_kaggle_query(query: KaggleQuery, email=Depends(auth_handler.auth_wrapper)):
    path = str(uuid.uuid4())
    print(query)
    
    kaggle.api.dataset_download_file(query.datasetName,query.fileName,path=path)
    try:
        open('{path}/{fileName}'.format(fileName=query.fileName, path=path), 'r')
    except IOError:
        zipfiles = '{path}/{fileName}.zip'.format(fileName=query.fileName, path=path)
        with zipfile.ZipFile(zipfiles,"r") as zip_ref:
                zip_ref.extractall(path)
        # df = pd.read_csv('{path}/{fileName}'.format(fileName=query.fileName, path=path))

    df=None
    if query.queryType == "head":
        df = pd.read_csv('{path}/{fileName}'.format(fileName=query.fileName, path=path)).head()
    elif query.queryType == "tail":
        df = pd.read_csv('{path}/{fileName}'.format(fileName=query.fileName, path=path)).tail()
    elif query.queryType == "description":
        df = pd.read_csv('{path}/{fileName}'.format(fileName=query.fileName, path=path)).describe()
    elif query.queryType == "all":
        df = pd.read_csv('{path}/{fileName}'.format(fileName=query.fileName, path=path))
    shutil.rmtree(path)
    output = io.StringIO()
    output = df.to_csv(encoding='utf-8')
    ufilename = time.strftime("%Y%m%d-%H%M%S") + ".csv"
    uploadFile = upload_blob(ufilename, "pdqueries", output)

    if(uploadFile.status_code == 200):
        savedData = {
            "filename": ufilename,
            "queryType": query.queryType,
            "path": query.path,
            "createdAt": time.strftime("%Y-%m-%d %H:%M:%S"),
            "email": email
        }
        conn.local.query.insert_one(dict(savedData))
        return savedData
    else:
        return "Failed"
   


    

    







