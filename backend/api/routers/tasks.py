from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status

from api.models import Task
from api.deps import db_dependency, user_dependency

router = APIRouter(
    prefix='/tasks',
    tags=['tasks']
)

class TaskBase(BaseModel):
    name: str
    description: Optional[str] = None
    
class TaskCreate(TaskBase):
    pass


@router.get('/')
def get_task(db: db_dependency, user: user_dependency, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

@router.get('/tasks')
def get_tasks(db: db_dependency, user: user_dependency):
    return db.query(Task).all()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_task(db: db_dependency, user: user_dependency, task: TaskCreate):
    db_task = Task(**task.model_dump(), user_id=user.get('id'))
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/")
def delete_task(db: db_dependency, user: user_dependency, task_id: int):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task