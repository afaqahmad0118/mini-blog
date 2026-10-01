from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database_models
from database import get_db
from schemas import Comment, CommentCreate
from security import get_current_user

router = APIRouter(tags=["Comments"])

@router.get("/posts/{post_id}/comments", response_model=list[Comment])
def get_comments(post_id: int, db: Session = Depends(get_db)):
    return db.query(database_models.Comment).filter(database_models.Comment.post_id == post_id).all()

@router.post("/posts/{post_id}/comments", response_model=Comment)
def create_comment(post_id: int, comment: CommentCreate, db: Session = Depends(get_db), current_user: database_models.User = Depends(get_current_user)):
    post = db.query(database_models.Post).filter(database_models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db_comment = database_models.Comment(**comment.model_dump(), post_id=post_id, user_id=current_user.id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

@router.delete("/comments/{id}")
def delete_comment(id: int, db: Session = Depends(get_db), current_user: database_models.User = Depends(get_current_user)):
    db_comment = db.query(database_models.Comment).filter(database_models.Comment.id == id).first()
    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if db_comment.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete your own comments")
    db.delete(db_comment)
    db.commit()
    return "Comment deleted"
