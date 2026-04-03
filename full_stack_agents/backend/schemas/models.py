from pydantic import BaseModel


class AgentInfo(BaseModel):
    role: str
    goal: str
    backstory: str


class BeginnerExample(BaseModel):
    id: str
    text: str
    label: str


class BeginnerRequest(BaseModel):
    text: str
    demo: bool = False


class BeginnerResponse(BaseModel):
    verdict: str
    reasoning: str
    confidence: float
    agent_info: AgentInfo


class LogFileSchema(BaseModel):
    name: str
    content: str


class IntermediateRequest(BaseModel):
    log_file: str
    demo: bool = False


class PipelineStepEvent(BaseModel):
    step: int
    agent_name: str
    status: str
    output: str


class AdvancedRequest(BaseModel):
    stock: str
    demo: bool = False


class AdvancedResult(BaseModel):
    company_info: dict
    financial_analysis: str
    investment_recommendation: str
    recommendation_verdict: str
    timing: dict
