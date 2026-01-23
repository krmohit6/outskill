import os

from crewai import Agent
from crewai.llm import LLM
from dotenv import load_dotenv

load_dotenv()

llm = LLM(
    model="openai/gpt-4o",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
    temperature=0.7,
    max_tokens=4000,
    timeout=120,
)

# Define your agent with OpenAI LLM
thinker = Agent(
    role="Critical Thinker",
    goal="Analyse the text and identify if any conflicting information within",
    llm=llm,
    backstory=(
        "You are a critical thinker who understands details very well and expert negotiator. \
         You can identify conflicting statements, information in given text"
    ),
)