from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database_models
from database import engine, SessionLocal
from schemas import PostCreate
from routers.posts import router as posts_router
from routers.comments import router as comments_router
from routers.users import router as users_router
import os
from fastapi.staticfiles import StaticFiles




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3003"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


posts = [
    PostCreate(title="Hello World", content="My first blog post"),
    PostCreate(title="Learning FastAPI", content="FastAPI is fast and easy"),
]

def init_db():
    db = SessionLocal()
    count = db.query(database_models.Post).count()
    if count == 0:
        for post in posts:
            db.add(database_models.Post(**post.model_dump()))
        db.commit()
    db.close()

init_db()


@app.get("/")
def home():
    return {"message": "Welcome to Mini Blog"}

app.include_router(posts_router)
app.include_router(comments_router)
app.include_router(users_router)

