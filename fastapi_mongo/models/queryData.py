from pydantic import BaseModel

class Query(BaseModel):
    path: str
    queryType: str

class SaveQuery(BaseModel):
    path: str
    queryType: str

class KaggleQuery(BaseModel):
    datasetName: str
    fileName: str
    queryType: str
    path:str

class SearchData(BaseModel):
    search:str

class GetFiles(BaseModel):
    datasetName: str

