from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.repositories.health_trend_repository import (
    HealthTrendRepository
)

router = APIRouter(
    prefix="/trends",
    tags=["Trends"]
)


@router.get("/{parameter}")
def get_trend(parameter: str, db: Session = Depends(get_db)):

    repository = HealthTrendRepository(
        db
    )

    history = repository.get_parameter_history(
        1,
        parameter
    )

    return history