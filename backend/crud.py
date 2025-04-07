from sqlmodel import Session, select
from .models.task import Todo

def get_todos(db: Session):
    return db.exec(select(Todo)).all()

def get_todo(db: Session, todo_id: int):
    return db.exec(select(Todo).where(Todo.id == todo_id)).first()

def create_todo(db: Session, todo: Todo):
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

def update_todo(db: Session, todo_id: int, updated_todo: Todo):
    todo = get_todo(db, todo_id)
    if todo:
        todo.title = updated_todo.title
        todo.description = updated_todo.description
        todo.completed = updated_todo.completed
        db.commit()
        db.refresh(todo)
    return todo

def delete_todo(db: Session, todo_id: int):
    todo = get_todo(db, todo_id)
    if todo:
        db.delete(todo)
        db.commit()
    return todo


