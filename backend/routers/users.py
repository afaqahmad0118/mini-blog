from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database_models
from database import get_db
from schemas import UserCreate, UserOut
from fastapi.security import OAuth2PasswordRequestForm
from security import hash_password, verify_password, create_access_token, get_current_user


router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(database_models.User).filter(
        (database_models.User.username == user.username) | (database_models.User.email == user.email)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username or email already taken")
    db_user = database_models.User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(database_models.User).filter(database_models.User.username == form.username).first()
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Wrong username or password")
    token = create_access_token(user.id)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserOut)
def read_me(current_user: database_models.User = Depends(get_current_user)):
    return current_user
