import os

from crewai_tools import EXASearchTool, FileReadTool

# Web Search Tools
os.environ["EXA_API_KEY"] = os.getenv("EXA_API_KEY")

# Initialize EXASearchTool without optional parameters to avoid validation errors
try:
    exa_search_tool = EXASearchTool()
except Exception as e:
    print(f"EXA Search Tool initialization failed: {e}")
    # Fallback: try with empty lists for domains
    exa_search_tool = EXASearchTool(include_domains=[], exclude_domains=[])

# Initialize FileReadTool for reading log files
log_reader_tool = FileReadTool()
