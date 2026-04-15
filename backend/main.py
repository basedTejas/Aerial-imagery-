from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.routes import upload, result

app = FastAPI()

# Include routes
app.include_router(upload.router, prefix="/api")
app.include_router(result.router, prefix="/api")

# Serve audio files
app.mount("/audio", StaticFiles(directory="uploads/audio"), name="audio")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def root():
    return {
        "message": "Aerial Image Description Backend Running 🚀"
    }
