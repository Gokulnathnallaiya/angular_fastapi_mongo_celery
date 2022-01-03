from typing import BinaryIO
from azure.storage.blob import BlobServiceClient
from fastapi.responses import JSONResponse, StreamingResponse

conn_str="DefaultEndpointsProtocol=https;AccountName=fastapistac;AccountKey=qLZMTeYTWLBOa1STScHUs0CrJuy+6aG9zP4GgZ6gA2yHD/NT/SbPP45L6SpTAjiJg41YZmwi2Y1DFkhDb1bzgw==;EndpointSuffix=core.windows.net"
blob_service_client = BlobServiceClient.from_connection_string(conn_str)


def response_json(message: str, status: int = 200) -> JSONResponse:
    return JSONResponse(content={"message": message}, status_code=status)


def upload_blob(filename: str, container: str, data: BinaryIO):
    try:
        blob_client = blob_service_client.get_blob_client(
            container=container, blob=filename)
        blob_client.upload_blob(data)
        return response_json(message="success", status=200)
    except Exception as e:
        print(e)
        return response_json(message=e.message, status=500)
    





