from fastapi import APIRouter, HTTPException
from app.database import SessionLocal
from app.models.image_model import ImageRequest

router = APIRouter()


@router.get("/result/{image_id}")
def get_result(image_id: str):

    db = SessionLocal()

    result = db.query(ImageRequest).filter(
        ImageRequest.image_id == image_id
    ).first()

    db.close()

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Image not found"
        )

    if result.status == "processing":
        return {
            "status": "processing",
            "message": "Your image is still being processed"
        }

    if result.status == "failed":
        return {
            "status": "failed",
            "message": "Processing failed. Try again."
        }

    return {
        "status": "completed",
        "description": result.description,
        "audio_url": result.audio_path
    }
