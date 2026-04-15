from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class ImageRequest(Base):
    __tablename__ = "image_requests"

    id = Column(Integer, primary_key=True, index=True)
    image_id = Column(String, unique=True, index=True)
    image_path = Column(String)
    description = Column(String, nullable=True)
    audio_path = Column(String, nullable=True)
    status = Column(String, default="processing")
    created_at = Column(DateTime, default=datetime.utcnow)
