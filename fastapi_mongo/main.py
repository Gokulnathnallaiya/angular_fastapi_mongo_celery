from fastapi import FastAPI
from routes.user import user
from routes.query import query
from routes.tasks import task_routes
from routes.blob_routes import blob_routes
from routes.kaggle import kaggle_routes
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import kaggle

app = FastAPI()
kaggle.api.authenticate()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(task_routes, prefix="/task")
app.include_router(user, prefix="/auth")
app.include_router(query, prefix='/query')
app.include_router(blob_routes, prefix='/blob')
app.include_router(kaggle_routes, prefix='/kaggle')


if __name__ =='__main__':
    uvicorn.run("main:app", port=9000, host="0.0.0.0", reload= True, workers=2)