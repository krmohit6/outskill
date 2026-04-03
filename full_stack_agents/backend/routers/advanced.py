import json

from fastapi import APIRouter
from sse_starlette.sse import EventSourceResponse

from schemas.models import AdvancedRequest
from services import advanced_service

router = APIRouter(prefix="/api/advanced", tags=["advanced"])


@router.post("/analyze")
async def analyze_stock(request: AdvancedRequest) -> EventSourceResponse:
    async def event_generator():
        async for event in advanced_service.analyze_stock_stream(request.stock, request.demo):
            yield {"data": json.dumps(event)}

    return EventSourceResponse(event_generator())
