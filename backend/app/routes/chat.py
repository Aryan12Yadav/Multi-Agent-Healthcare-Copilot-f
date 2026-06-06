from fastapi import APIRouter

from app.ai.deepseek import ask_llm

from app.ai.memory import build_context
from app.ai.memory import save_memory
from app.ai.memory import get_memories


router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("")
def chat(question: str):

    user_id = 1

    context = build_context(
        user_id=user_id,
        question=question
    )

    prompt = f"""
    You are MedSphere AI.

    Context:

    {context}

    Question:

    {question}
    """

    answer = ask_llm(prompt)

    save_memory(
        user_id=user_id,
        memory_type="chat",
        content=f"Q:{question}\nA:{answer}"
    )

    return {
        "success": True,
        "response": answer
    }


@router.get("/history")
def history():

    memories = get_memories(
        user_id=1
    )

    return {
        "success": True,
        "count": len(memories),
        "history": memories
    }