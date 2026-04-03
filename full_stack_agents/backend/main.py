import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.beginner import router as beginner_router
from routers.intermediate import router as intermediate_router
from routers.advanced import router as advanced_router

app = FastAPI(title="Agent Studio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(beginner_router)
app.include_router(intermediate_router)
app.include_router(advanced_router)


@app.get("/api/health")
async def health_check() -> dict:
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
