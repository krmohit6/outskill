# Outskill Workshop Monorepo

Workshop code for **Outskill** GenAI tracks: CrewAI agents (beginner → advanced), RAG experiments, and small multimodal / diffusion scripts. This is a **reference and teaching repo**, not a versioned library—expect per-module dependencies and entrypoints documented in place.

![Python](https://img.shields.io/badge/python-3.11+-0f172a?style=flat&logo=python&logoColor=ffdd54)
![Stack](https://img.shields.io/badge/stack-CrewAI%20%7C%20RAG%20%7C%20notebooks-334155?style=flat)

---

### Contents

- [Quick start](#quick-start)
- [What’s inside](#whats-inside)
- [Configuration](#configuration)
- [Layout](#layout)
- [Dependencies](#dependencies)
- [Running agents](#running-agents)

---

## Quick start

```bash
git clone https://github.com/ishandutta0098/outskill.git && cd outskill

# Pick one:
conda create -n agents python=3.11 -y && conda activate agents
# or
python3 -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

Install what you need for the path you’re using (there is **no** root `requirements.txt`). Examples:

```bash
pip install crewai crewai-tools python-dotenv          # agent tracks
pip install -r rags/myntra_rag/requirements.txt      # Myntra RAG subproject
```

Create a **`.env`** at the repo root (see [Configuration](#configuration)). Then run from the relevant folder, e.g. `agents/advanced`, so local imports (`agents`, `tasks`, …) resolve.

---

## What’s inside

| Module | Purpose |
|--------|---------|
| **`agents/`** | CrewAI curricula: single-agent, sequential multi-agent, parallel crews + custom tools. LLM calls in examples use **OpenRouter**. Curriculum detail: [`agents/README.md`](agents/README.md). |
| **`rags/`** | LangChain / LlamaIndex / Haystack-style experiments; Myntra RAG sample with pinned deps. |
| **`multimodal/`** | Image–text demos (e.g. CLIP via `transformers`). |
| **`diffusion/`** | OpenAI image generation samples. |
| **`docs/`**, **`assets/`** | Supporting PDFs, papers, resumes, static assets. |
| **`task_outputs/`** | Generated outputs; safe to regenerate or gitignore-heavy. |

**Not in scope:** a unified CLI, Docker compose for every service, or a single lockfile for all subprojects—by design.

---

## Configuration

Root **`.env`** (gitignored). Set only what you use:

```env
OPENAI_API_KEY=
OPENROUTER_API_KEY=
EXA_API_KEY=
ADZUNA_APP_ID=
ADZUNA_API_KEY=
```

Most agent examples expect **`OPENROUTER_API_KEY`**. Other keys back optional tools (search, job APIs, etc.)—see the script you run.

---

## Layout

```
outskill/
├── agents/
│   ├── beginner/           # single agent, OpenRouter LLM
│   ├── intermediate/       # sequential crew, built-in tools
│   ├── advanced/           # parallel crews, custom tools, optional API helpers
│   ├── dummy_logs/
│   └── README.md           # per-level objectives
├── rags/
├── multimodal/
├── diffusion/
├── docs/
├── assets/
└── task_outputs/           # + agents/*/task_outputs/ when scripts write files
```

---

## Dependencies

| Location | Notes |
|----------|--------|
| `rags/myntra_rag/requirements.txt` | Pinned LangChain-related stack for that subproject. |
| Everything else | Declared in file headers or notebook cells (`pip install …`). Roll your own `requirements.txt` if you want one fat environment. |

---

## Running agents

1. Activate the env (`conda activate agents` or `.venv`).
2. `cd agents/<beginner|intermediate|advanced>`.
3. `python main.py` (or the script documented in that directory).

Imports assume you run from the **track directory** (or adjust `PYTHONPATH` accordingly). If something fails on import, you’re usually in the wrong working directory.

---

## License

MIT License

---

## Acknowledgements

Workshop material for Outskill; upstream tools (CrewAI, OpenRouter, Hugging Face, etc.) are cited in individual scripts and notebooks.
