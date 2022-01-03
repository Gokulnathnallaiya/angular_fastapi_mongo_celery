import time
from celery import Celery
from celery.utils.log import get_task_logger
import pandas as pd
from azureFunctions import upload_blob
from pymongo import MongoClient
import io


logger = get_task_logger(__name__)
app = Celery('tasks',
             broker='amqp://admin:mypass@localhost:5672',
             backend='mongodb://localhost:27017/mydb')

conn = MongoClient("mongodb://localhost:27017/test")

@app.task()
def longtime_add(x, y):
    logger.info('Got Request - Starting work ')
    time.sleep(20)
    logger.info('Work Finished ')
    return x + y

    
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
    
