from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database_models
from database import get_db
from schemas import Post, PostCreate
from security import get_current_user
import os
import uuid
from fastapi import UploadFile, File


router = APIRouter(prefix="/posts", tags=["Posts"])

@router.get("", response_model=list[Post])
def get_all_posts(search: str = "", skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    query = db.query(database_models.Post)
    if search:
        query = query.filter(database_models.Post.title.ilike(f"%{search}%"))
    return query.order_by(database_models.Post.id).offset(skip).limit(limit).all()

@router.get("/{id}", response_model=Post)
def get_post(id: int, db: Session = Depends(get_db)):
    db_post = db.query(database_models.Post).filter(database_models.Post.id == id).first()
    if db_post:
        return db_post
    raise HTTPException(status_code=404, detail="Post not found")

@router.post("", response_model=Post)
def create_post(post: PostCreate, db: Session = Depends(get_db), current_user: database_models.User = Depends(get_current_user)):
    db_post = database_models.Post(**post.model_dump(), user_id=current_user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.put("/{id}")
def update_post(id: int, post: PostCreate, db: Session = Depends(get_db), current_user: database_models.User = Depends(get_current_user)):
    db_post = db.query(database_models.Post).filter(database_models.Post.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only edit your own posts")
    db_post.title = post.title
    db_post.content = post.content
    db.commit()
    return "Post updated"

@router.delete("/{id}")
def delete_post(id: int, db: Session = Depends(get_db), current_user: database_models.User = Depends(get_current_user)):
    db_post = db.query(database_models.Post).filter(database_models.Post.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete your own posts")
    db.delete(db_post)
    db.commit()
    return "Post deleted"

ALLOWED_TYPES = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}
MAX_SIZE = 5 * 1024 * 1024  # 5 MB

@router.post("/{id}/cover", response_model=Post)
def upload_cover(id: int, file: UploadFile = File(...), db: Session = Depends(get_db), current_user: database_models.User = Depends(get_current_user)):
    db_post = db.query(database_models.Post).filter(database_models.Post.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only change your own posts")
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only JPG, PNG or WEBP images are allowed")

    data = file.file.read()
    if len(data) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="Image must be smaller than 5 MB")

    filename = f"{uuid.uuid4().hex}{ALLOWED_TYPES[file.content_type]}"
    with open(os.path.join("uploads", filename), "wb") as f:
        f.write(data)

    db_post.cover_image = f"/uploads/{filename}"
    db.commit()
    db.refresh(db_post)
    return db_post
