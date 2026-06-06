from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import hash_password
from app.core.security import verify_password
from app.core.security import create_access_token

from app.models.user import User


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(username: str, email: str, password: str, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:

        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        username=username,
        email=email,
        password_hash=hash_password(password)
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    token = create_access_token(user.id)

    return {
        "success": True,
        "token": token
    }


@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user:

        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(password, user.password_hash):

        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user.id)

    return {
        "success": True,
        "token": token
    }