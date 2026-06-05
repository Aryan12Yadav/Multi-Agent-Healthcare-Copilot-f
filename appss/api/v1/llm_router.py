"""
LLM Router

Testing NVIDIA model.
"""

from fastapi import APIRouter

from appss.llm.providers.deepseek_provider import DeepSeekProvider


router = APIRouter(
    prefix="/llm",
    tags=["LLM"]
)


@router.get("/test")
def test_llm():

    provider = DeepSeekProvider()

    response = provider.generate(
        "Explain diabetes in simple language."
    )

    return {
        "response": response
    }


