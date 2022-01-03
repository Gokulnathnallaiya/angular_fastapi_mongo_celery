def queryEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "filename": item["filename"],
        "queryType": item["queryType"],
        "path": item["path"],
        "createdAt": item["createdAt"]
    }

def queriesEntity(entityy) -> list:
    return [queryEntity(item) for item in entityy]
