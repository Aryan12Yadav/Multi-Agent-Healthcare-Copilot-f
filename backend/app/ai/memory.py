from datetime import datetime

from app.core.database import mongo_db


def save_memory(user_id: int, question: str, answer: str):

    mongo_db.chat_memory.insert_one({
        "user_id": user_id,
        "question": question,
        "answer": answer,
        "created_at": datetime.utcnow()
    })


def get_memories(user_id: int, limit: int = 20):

    memories = list(
        mongo_db.chat_memory.find(
            {
                "user_id": user_id
            }
        ).sort(
            "created_at",
            -1
        ).limit(limit)
    )

    memories.reverse()

    return memories


def build_context(user_id: int):

    memories = get_memories(user_id)

    context = ""

    for item in memories:

        context += f"User: {item['question']}\n"

        context += f"Assistant: {item['answer']}\n\n"

    return context


def save_report_memory(user_id: int, report_id: int, question: str, answer: str):

    mongo_db.report_memory.insert_one({
        "user_id": user_id,
        "report_id": report_id,
        "question": question,
        "answer": answer,
        "created_at": datetime.utcnow()
    })


def build_report_context(user_id: int, report_id: int):

    memories = list(
        mongo_db.report_memory.find(
            {
                "user_id": user_id,
                "report_id": report_id
            }
        ).sort(
            "created_at",
            -1
        ).limit(20)
    )

    memories.reverse()

    context = ""

    for item in memories:

        context += f"User: {item['question']}\n"

        context += f"Assistant: {item['answer']}\n\n"

    return context