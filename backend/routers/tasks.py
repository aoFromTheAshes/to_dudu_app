from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..database import engine
from ..models.task import Todo
from ..crud import get_todos, get_todo, create_todo, update_todo, delete_todo

router = APIRouter()

def get_db():
    with Session(engine) as session:
        yield session

@router.get("/todos")
def read_todos(db: Session = Depends(get_db)):
    return get_todos(db)

@router.get("/todos/{todo_id}")
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    return get_todo(db, todo_id)

@router.post("/todos")
def create_new_todo(todo: Todo, db: Session = Depends(get_db)):
    return create_todo(db, todo)

@router.put("/todos/{todo_id}")
def update_existing_todo(todo_id: int, updated_todo: Todo, db: Session = Depends(get_db)):
    return update_todo(db, todo_id, updated_todo)

@router.delete("/todos/{todo_id}")
def delete_existing_todo(todo_id: int, db: Session = Depends(get_db)):
    return delete_todo(db, todo_id)
