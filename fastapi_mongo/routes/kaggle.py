import os
from bson.objectid import ObjectId
from fastapi import APIRouter, Depends
import pandas as pd
from starlette.responses import JSONResponse
from auth import AuthHandler
from models.queryData import GetFiles
from models.queryData import SearchData
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
import kaggle
import simplejson as json
import uuid
import shutil
import zipfile
kaggle_routes = APIRouter()
auth_handler = AuthHandler()

simple_app = Celery('simple_worker',
                    broker='amqp://admin:mypass@rabbitmq:5672',
                    backend='mongodb://mongodb_container:27017/mydb')

@kaggle_routes.post("/dataset-list", tags=["kaggle"])
def get_dataset_list(body: SearchData):
    a = kaggle.api.datasets_list(search = body.search)
    # print(a)
    return JSONResponse(status_code=200,content={"message": a})

@kaggle_routes.post("/dataset-list-files", tags=["kaggle"])
def get_dataset_list(body: GetFiles):
    a = kaggle.api.dataset_list_files(body.datasetName).files
    print(a)
    res = [str(x) for x in a]
    return JSONResponse(status_code=200,content={"message":res})

@kaggle_routes.post("/get_data", tags=["kaggle"])
def get_kaggle_file_data(query: KaggleQuery):
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

    
    if (df is not None):
        finalData = df.fillna(0)
        print(df)
        shutil.rmtree(path)
        return JSONResponse(content={
        "data": list(finalData.to_dict('records')),
        "columns": list(finalData.columns)
        }, status_code=200) 
    else:
        return JSONResponse(status_code=404, content={"message": "Something Went wrong"})


