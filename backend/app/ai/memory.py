from datetime import datetime

from app.core.database import mongo_db

from app.ai.deepseek import ask_llm


def save_memory(user_id: int, memory_type: str, content: str):

    mongo_db.long_term_memory.insert_one({
        "user_id": user_id,
        "memory_type": memory_type,
        "content": content,
        "created_at": datetime.utcnow()
    })


def get_memories(user_id: int, limit: int = 50):

    return list(
        mongo_db.long_term_memory.find(
            {
                "user_id": user_id
            }
        ).sort(
            "created_at",
            -1
        ).limit(limit)
    )


def save_report_memory(user_id: int, report_id: int, question: str, answer: str):

    mongo_db.report_memory.insert_one({
        "user_id": user_id,
        "report_id": report_id,
        "question": question,
        "answer": answer,
        "created_at": datetime.utcnow()
    })


def get_report_memory(user_id: int, report_id: int, limit: int = 20):

    data = list(
        mongo_db.report_memory.find(
            {
                "user_id": user_id,
                "report_id": report_id
            }
        ).sort(
            "created_at",
            -1
        ).limit(limit)
    )

    data.reverse()

    return data


def build_report_context(user_id: int, report_id: int):

    memories = get_report_memory(
        user_id=user_id,
        report_id=report_id
    )

    context = ""

    for item in memories:

        context += f"User: {item['question']}\n"

        context += f"Assistant: {item['answer']}\n\n"

    return context


def search_memory(user_id: int, query: str):

    memories = get_memories(user_id)

    memory_text = "\n".join([
        item.get(
            "content",
            ""
        )
        for item in memories
    ])

    prompt = f"""
    Find relevant information.

    Query:

    {query}

    Memories:

    {memory_text}
    """

    return ask_llm(prompt)


def build_context(user_id: int, question: str, report_context: str = ""):

    memory_context = search_memory(
        user_id=user_id,
        query=question
    )

    return f"""
    User Memory:

    {memory_context}

    Report Context:

    {report_context}

    Question:

    {question}
    """


def compress_memory(memory_text: str):

    prompt = f"""
    Summarize conversation.

    Keep important medical information.

    Conversation:

    {memory_text}
    """

    return ask_llm(prompt)


def build_patient_memory(user_id: int):

    report_memory = list(
        mongo_db.report_memory.find(
            {
                "user_id": user_id
            }
        ).sort(
            "created_at",
            -1
        ).limit(30)
    )

    long_term_memory = list(
        mongo_db.long_term_memory.find(
            {
                "user_id": user_id
            }
        ).sort(
            "created_at",
            -1
        ).limit(30)
    )

    context = ""

    for item in report_memory:

        context += item.get(
            "question",
            ""
        )

        context += "\n"

        context += item.get(
            "answer",
            ""
        )

        context += "\n\n"

    for item in long_term_memory:

        context += item.get(
            "content",
            ""
        )

        context += "\n\n"

    return context