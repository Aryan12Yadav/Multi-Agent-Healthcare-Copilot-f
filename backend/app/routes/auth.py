from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.core.security import hash_password
from app.core.security import verify_password
from app.core.security import create_access_token
from app.core.security import decode_access_token

from app.models.user import User


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register")
def register(
    name: str,
    email: str,
    password: str,
    db: Session = Depends(get_db)
):

    if len(name.strip()) < 2:

        raise HTTPException(
            status_code=400,
            detail="Name must contain at least 2 characters"
        )

    if "@" not in email:

        raise HTTPException(
            status_code=400,
            detail="Invalid email address"
        )

    if len(password) < 8:

        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 8 characters"
        )

    existing_user = (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user = User(
        name=name,
        email=email,
        password=hash_password(password)
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {
        "success": True,
        "user_id": user.id,
        "message": "Registration successful"
    }


@router.post("/login")
def login(
    email: str,
    password: str,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        password,
        user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        user.id
    )

    return {
        "success": True,
        "token": token,
        "user_id": user.id,
        "name": user.name,
        "email": user.email
    }


@router.get("/me")
def me(
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }


def get_current_user(
    token: str,
    db: Session
):

    try:

        payload = decode_access_token(
            token
        )

        user_id = payload.get(
            "user_id"
        )

        if not user_id:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user = (
        db.query(User)
        .filter(
            User.id == user_id
        )
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user