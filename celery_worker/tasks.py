import time
from celery import Celery
from celery.utils.log import get_task_logger
import pandas as pd
from starlette.responses import JSONResponse
from azureFunctions import upload_blob
from pymongo import MongoClient
# import kaggle
import shutil
import io
import uuid

# kaggle.api.authenticate()
logger = get_task_logger(__name__)
app = Celery('tasks',
             broker='amqp://admin:mypass@rabbitmq:5672',
             backend='mongodb://mongodb_container:27017/mydb')

conn = MongoClient("mongodb://mongodb_container:27017/test")

@app.task()
def save_query(path, queryType, email):
    logger.info('Got Request - Starting work ')
    df=pd.read_csv(path)
    filename = time.strftime("%Y%m%d-%H%M%S") + ".csv"
    if(queryType == "head"):
        df = df.head()
    elif(queryType == "tail"):
        df = df.tail()
    elif(queryType == "describe"):
        df = df.describe()
    output = io.StringIO()
    output = df.to_csv(encoding='utf-8')
    uploadFile = upload_blob(filename, "pdqueries", output)
    logger.info('Work Finished ')
    if(uploadFile.status_code == 200):
        savedData = {
            "filename": filename,
            "queryType": queryType,
            "path": path,
            "createdAt": time.strftime("%Y-%m-%d %H:%M:%S"),
            "email": email
        }
        conn.local.query.insert_one(dict(savedData))
        return savedData
    else:
        return "Failed"

# @app.task()
# def save_kaggle_query(query,datasetName, fileName, queryType, email):
#     path = str(uuid.uuid4())
#     kaggle.api.dataset_download_file(datasetName,fileName,path)
#     df=None
#     if query.queryType == "head":
#         df = pd.read_csv('{path}/{fileName}'.format(fileName=fileName, path=path)).head()
#     elif query.queryType == "tail":
#         df = pd.read_csv('{path}/{fileName}'.format(fileName=fileName, path=path)).tail()
#     elif query.queryType == "description":
#         df = pd.read_csv('{path}/{fileName}'.format(fileName=fileName, path=path)).describe()
#     elif query.queryType == "all":
#         df = pd.read_csv('{path}/{fileName}'.format(fileName=fileName, path=path))
#     shutil.rmtree(path)
#     output = io.StringIO()
#     output = df.to_csv(encoding='utf-8')
#     ufilename = time.strftime("%Y%m%d-%H%M%S") + ".csv"
#     uploadFile = upload_blob(ufilename, "pdqueries", output)
#     logger.info('Work Finished ')
#     if(uploadFile.status_code == 200):
#         savedData = {
#             "filename": ufilename,
#             "queryType": queryType,
#             "path": path,
#             "createdAt": time.strftime("%Y-%m-%d %H:%M:%S"),
#             "email": email
#         }
#         conn.local.query.insert_one(dict(savedData))
#         return savedData
#     else:
#         return "Failed"
    
    
