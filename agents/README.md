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
- `Memory` — agents remember and learn across multiple runs

**Standalone Feature Notebooks** (run independently, one concept each):

- `feature_structured_output.ipynb` — Log analysis with Pydantic models (before/after)
- `feature_guardrails.ipynb` — Agent self-correction with code + no-code guardrails (before/after)

**Examples Set** (v2 Features):

- Structured Output with Pydantic
- Code Guardrail (validation function)
- No-Code Guardrail (plain English)
- Memory-enabled Crew

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

#### v2 — Scaling to Production (Perplexity Finance-inspired)

**Learning Objectives**:

- `Async Multi-Stock Screener` — analyze a watchlist of stocks simultaneously using `akickoff()` + `asyncio.gather()`
- `Flows` — build intelligent routing pipelines with `@start`, `@router`, `@listen` (BUY → entry strategy, SELL → exit plan, HOLD → monitoring plan)
- Full pipeline combining async + flows into a portfolio screener with smart routing
- `FastAPI Integration` — expose the agent system as a REST API

---

