from fastapi import APIRouter, File, UploadFile, HTTPException
import os
import uuid

from app.database import SessionLocal
from app.models.image_model import ImageRequest
from app.services.ml_service import generate_description
from app.services.tts_service import generate_audio

router = APIRouter()

UPLOAD_DIR = "uploads/images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):

    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Only JPG and PNG allowed")

    content = await file.read()

    if not content:
        raise HTTPException(status_code=400, detail="Empty file")

    image_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{image_id}.jpg")

    with open(file_path, "wb") as f:
        f.write(content)

    db = SessionLocal()

    try:
        new_image = ImageRequest(
            image_id=image_id,
            image_path=file_path,
            status="processing"
        )
        db.add(new_image)
        db.commit()

        # ML
        description = generate_description(file_path)

        # TTS
        audio_path = generate_audio(description, image_id)

        # Update DB
        db.query(ImageRequest).filter(
            ImageRequest.image_id == image_id
        ).update({
            "description": description,
            "audio_path": audio_path,
            "status": "completed"
        })
        db.commit()

    except Exception as e:
        db.query(ImageRequest).filter(
            ImageRequest.image_id == image_id
        ).update({"status": "failed"})
        db.commit()
        db.close()

        raise HTTPException(status_code=500, detail=str(e))

    db.close()

    return {
        "status": "completed",
        "imageId": image_id,
        "description": description,
        "audio": audio_path
    }
