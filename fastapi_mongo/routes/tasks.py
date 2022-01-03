from bson.objectid import ObjectId
from fastapi import APIRouter, Depends
import pandas as pd
from starlette.responses import JSONResponse
from auth import AuthHandler
from models.queryData import Query, SaveQuery
from azure.storage.blob import *
import io
import pandas as pd
from schemas.azureFunctions import response_json, upload_blob
import time
from config.db import conn
from schemas.query import queriesEntity
from celery import Celery

task_routes = APIRouter()
auth_handler = AuthHandler()
simple_app = Celery('simple_worker',
                    broker='amqp://admin:mypass@rabbitmq:5672',
                    backend='mongodb://mongodb_container:27017/mydb')


@task_routes.get('/status/{task_id}', tags=["task"])
def get_status(task_id):
    status = simple_app.AsyncResult(task_id, app=simple_app)
    print("Invoking Method ")
    return JSONResponse(status_code=200, content={"status": str(status.state)})


@task_routes.get('/result/{task_id}', tags=["task"])
def task_result(task_id):
    result = simple_app.AsyncResult(task_id).result
    return JSONResponse(status_code=200, content={"status": str(result)})