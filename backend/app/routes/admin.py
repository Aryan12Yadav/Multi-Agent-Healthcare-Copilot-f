from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.user import User

from app.routes.auth import get_current_admin


router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/users")
def get_users(
    token: str,
    db: Session = Depends(get_db)
):

    get_current_admin(
        token,
        db
    )

    users = (
        db.query(User)
        .order_by(
            User.id.desc()
        )
        .all()
    )

    result = []

    for user in users:

        result.append(
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "is_active": user.is_active,
                "is_blocked": user.is_blocked,
                "created_at": user.created_at
            }
        )

    return {
        "success": True,
        "count": len(result),
        "users": result
    }


@router.put("/users/{user_id}/block")
def block_user(
    user_id: int,
    token: str,
    db: Session = Depends(get_db)
):

    get_current_admin(
        token,
        db
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

    user.is_blocked = True

    db.commit()

    return {
        "success": True,
        "message": "User blocked"
    }


@router.put("/users/{user_id}/unblock")
def unblock_user(
    user_id: int,
    token: str,
    db: Session = Depends(get_db)
):

    get_current_admin(
        token,
        db
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

    user.is_blocked = False

    db.commit()

    return {
        "success": True,
        "message": "User unblocked"
    }


@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    token: str,
    db: Session = Depends(get_db)
):

    current_admin = get_current_admin(
        token,
        db
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

    if user.id == current_admin.id:

        raise HTTPException(
            status_code=400,
            detail="You cannot delete your own account"
        )

    db.delete(user)

    db.commit()

    return {
        "success": True,
        "message": "User deleted"
    }


@router.get("/stats")
def admin_stats(
    token: str,
    db: Session = Depends(get_db)
):

    get_current_admin(
        token,
        db
    )

    total_users = (
        db.query(User)
        .count()
    )

    blocked_users = (
        db.query(User)
        .filter(
            User.is_blocked == True
        )
        .count()
    )

    admin_users = (
        db.query(User)
        .filter(
            User.role == "admin"
        )
        .count()
    )

    return {
        "success": True,
        "total_users": total_users,
        "blocked_users": blocked_users,
        "admin_users": admin_users
    }