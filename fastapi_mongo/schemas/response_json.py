from fastapi.responses import JSONResponse, StreamingResponse
from typing import Iterable

def response_json(message: str, status: int = 200) -> JSONResponse:
    return JSONResponse(content={"message": message}, status_code=status)


def response_stream(data: Iterable[bytes], status: int = 200, download: bool = False) -> StreamingResponse:
    if download:
        return StreamingResponse(content=data, status_code=status, media_type="application/octet-stream")
    else:
        return StreamingResponse(content=data, status_code=status)