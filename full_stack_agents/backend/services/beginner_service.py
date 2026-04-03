import asyncio

from crewai import Agent, Crew, Task
from crewai.llm import LLM

from config import OPENROUTER_API_KEY
from demo.data import BEGINNER_EXAMPLES, BEGINNER_REASONING
from schemas.models import AgentInfo, BeginnerExample, BeginnerResponse


AGENT_ROLE = "Hate Speech Detector"
AGENT_GOAL = "Analyse the text and identify if any hate speech / offensive language is present"
AGENT_BACKSTORY = (
    "You are a Hate Speech Detector for Twitter who understands details very well and expert negotiator. "
    "You can identify hate speech / offensive language in given tweet."
)


def get_examples() -> list[BeginnerExample]:
    return [BeginnerExample(**ex) for ex in BEGINNER_EXAMPLES]


async def analyze_text(text: str, demo: bool) -> BeginnerResponse:
    agent_info = AgentInfo(role=AGENT_ROLE, goal=AGENT_GOAL, backstory=AGENT_BACKSTORY)

    if demo:
        await asyncio.sleep(1.5)
        text_lower = text.lower()
        has_hate_keywords = any(
            kw in text_lower
            for kw in ["unintelligent", "incapable", "untrustworthy", "not be allowed", "less intelligent"]
        )
        verdict = "hate_speech" if has_hate_keywords else "no_hate_speech"
        confidence = 0.97 if has_hate_keywords else 0.92
        return BeginnerResponse(
            verdict=verdict,
            reasoning=BEGINNER_REASONING[verdict],
            confidence=confidence,
            agent_info=agent_info,
        )

    llm = LLM(
        model="openai/gpt-4o",
        api_key=OPENROUTER_API_KEY,
        base_url="https://openrouter.ai/api/v1",
    )

    agent = Agent(
        role=AGENT_ROLE,
        goal=AGENT_GOAL,
        llm=llm,
        backstory=AGENT_BACKSTORY,
    )

    task = Task(
        description=(
            "Analyze the following text to determine if it contains any hate speech or offensive language. "
            "Follow these steps:\n"
            "1. Read the text carefully.\n"
            "2. Identify any language that targets a group or individual based on attributes such as race, ethnicity, gender, religion, nationality, disability, or sexual orientation.\n"
            "3. Look for threats, dehumanizing language, insults, or promotion of violence or hatred.\n"
            "4. Evaluate the context to ensure words or phrases are not taken out of context.\n"
            "5. Make an objective decision based on the content.\n"
            "Text:\n{text}"
        ),
        expected_output="Respond with 'hate speech' / 'no hate speech'.",
        agent=agent,
    )

    crew = Crew(agents=[agent], tasks=[task], verbose=True)
    result = await asyncio.to_thread(crew.kickoff, inputs={"text": text})

    raw = str(result).strip().lower()
    if "no hate" in raw or "no_hate" in raw:
        verdict = "no_hate_speech"
    else:
        verdict = "hate_speech"

    return BeginnerResponse(
        verdict=verdict,
        reasoning=str(result).strip(),
        confidence=0.95,
        agent_info=agent_info,
    )
