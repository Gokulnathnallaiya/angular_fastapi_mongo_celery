from pydantic import BaseModel

class Query(BaseModel):
    path: str
    queryType: str

class SaveQuery(BaseModel):
    path: str
    queryType: str