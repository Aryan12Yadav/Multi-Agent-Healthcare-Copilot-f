from pathlib import Path

BASE_DIR = "app"

structure = {
    "": [
        "main.py",
    ],

    "api/v1": [
        "auth_router.py",
        "user_router.py",
        "report_router.py",
        "chat_router.py",
        "hospital_router.py",
        "pharmacy_router.py",
        "trend_router.py",
        "voice_router.py",
        "admin_router.py",
    ],

    "controllers": [
        "auth_controller.py",
        "report_controller.py",
        "chat_controller.py",
        "user_controller.py",
    ],

    "services": [
        "auth_service.py",
        "report_service.py",
        "chat_service.py",
        "user_service.py",
    ],

    "managers": [
        "auth_manager.py",
        "report_manager.py",
        "chat_manager.py",
        "user_manager.py",
    ],

    "repositories": [
        "auth_repository.py",
        "report_repository.py",
        "chat_repository.py",
        "user_repository.py",
    ],

    "models": [
        "user.py",
        "role.py",
        "patient_profile.py",
        "doctor_profile.py",
        "report.py",
    ],

    "schemas": [
        "auth_schema.py",
        "user_schema.py",
        "report_schema.py",
    ],

    "agents": [],

    "agents/supervisor": [],
    "agents/report_agent": [],
    "agents/medical_agent": [],
    "agents/trend_agent": [],
    "agents/memory_agent": [],
    "agents/hospital_agent": [],
    "agents/pharmacy_agent": [],
    "agents/cost_agent": [],
    "agents/followup_agent": [],

    "rag": [],

    "rag/loaders": [],
    "rag/chunkers": [],
    "rag/embeddings": [],
    "rag/retrievers": [],
    "rag/vector_store": [],

    "memory": [],

    "memory/conversation_memory": [],
    "memory/report_memory": [],
    "memory/trend_memory": [],
    "memory/recommendation_memory": [],

    "ocr": [],
    "ocr/paddle": [],
    "ocr/processors": [],

    "database": [
        "base.py",
        "session.py",
    ],

    "database/migrations": [],

    "storage": [],
    "storage/reports": [],
    "storage/prescriptions": [],
    "storage/voice": [],

    "core": [
        "config.py",
        "security.py",
        "constants.py",
        "exceptions.py",
    ],

    "middleware": [
        "auth_middleware.py",
        "logging_middleware.py",
        "rate_limit_middleware.py",
    ],

    "workers": [
        "report_worker.py",
        "embedding_worker.py",
    ],

    "logs": [],
    "tests": [],
}


def create_file(path: Path):
    if not path.exists():
        path.touch()

        if path.suffix == ".py":
            path.write_text(
                f'"""{path.stem} module"""\n\n'
            )


def main():
    root = Path(BASE_DIR)
    root.mkdir(exist_ok=True)

    for folder, files in structure.items():
        current_dir = root / folder if folder else root

        current_dir.mkdir(parents=True, exist_ok=True)

        init_file = current_dir / "__init__.py"
        init_file.touch(exist_ok=True)

        for file in files:
            create_file(current_dir / file)

    print("✅ Backend structure created successfully!")


if __name__ == "__main__":
    main()