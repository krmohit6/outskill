# Agents

## Workshop Curriculum:

### 1. Beginner

**Agent Name**: Hate Speech Detection Agent. 

**Learning Objectives**:

- Learn to build a simple single agent system with CrewAI.
- Understand the basic syntax of CrewAI.
- Understand the usage of `OpenRouter API` for LLM calls.

**Examples Set**:

- Content Writer Agent
- Code Reviewer Agent
- Customer Support Agent

---

### 2. Intermediate

**Agent Name**: DevOps Engineer Agent.

#### v1 — Multi-Agent Pipelines

**Learning Objectives**:

- Learn to build a sequential multi-agent system with CrewAI.
- `Context` passing between agents
- `InBuilt Tool` usage in CrewAI (`FileReadTool`, `EXASearchTool`)
- Important Parameters such as `max_iter`, `max_rpm`, `max_execution_time`, `respect_context_window`, etc.

**Examples Set** (InBuilt Tools):

- Image Generation Tool
- Code Interpreter Tool
- AWS S3 Cloud Storage Tool

#### v2 — Production-Grade Features

**Learning Objectives**:

- `Structured Output` — get typed Python objects from agents using `output_pydantic`
- `Guardrails` — agents self-correct when output fails validation (code + no-code)

---

### 3. Advanced

**Agent Name**: Investment Advisor AI Agent

#### v1 — Investment Advisor Pipeline

**Learning Objectives**:

- Build `custom tools` with the `@tool` decorator (wrapping `yfinance` for real financial data)
- Multi-crew architecture — separate crews for separate concerns
- `Parallel execution` with `ThreadPoolExecutor` — run data + news gathering simultaneously
- `Structured Output` — get typed `InvestmentRecommendation` objects using `output_pydantic`
- `Guardrails` — validate recommendations before accepting them

**Examples Set**:

- Currency Converter Custom Tool
- CSV Data Parser Custom Tool
- URL Shortener Custom Tool

#### v2 — Scaling to Production

**Learning Objectives**:

- `Async Multi-Stock Screener` — analyze a watchlist of stocks simultaneously using `kickoff_async()` + `asyncio.gather()`
- Full async portfolio screener pipeline with side-by-side comparison

---

