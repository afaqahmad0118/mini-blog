from pydantic import BaseModel, ConfigDict
from datetime import datetime

class UserOut(BaseModel):
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)

class PostCreate(BaseModel):
    title: str
    content: str

class Post(BaseModel):
    id: int
    title: str
    content: str
    owner: UserOut | None = None
    cover_image: str | None = None


    model_config = ConfigDict(from_attributes=True)
    created_at: datetime | None = None


class CommentCreate(BaseModel):
    content: str

class Comment(BaseModel):
    id: int
    content: str
    post_id: int
    user: UserOut

    model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    username: str
    email: str
    password: str



