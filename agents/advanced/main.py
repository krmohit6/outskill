import os

from crewai import Crew, Process

from agents import analyst, data_explorer, fin_expert, news_info_explorer
from tasks import advise, analyse, get_company_financials, get_company_news

os.environ["CREWAI_STORAGE_DIR"] = (
    "/Users/ishandutta/Documents/code/outskill/agents/advanced/crewai_memory"
)

# Enhanced financial analysis crew with advanced configuration
crew = Crew(
    agents=[data_explorer, news_info_explorer, analyst, fin_expert],
    tasks=[get_company_financials, get_company_news, analyse, advise],
    verbose=True,
    process=Process.sequential,  # Fixed syntax: process instead of Process
    memory=True,  # Enable crew-level memory
    cache=True,  # Enable caching for better performance
    max_rpm=35,  # Overall rate limiting for the crew
)

if __name__ == "__main__":
    print("🚀 Starting Enhanced Financial Analysis...")

    # Scenario 1: Analyze RELIANCE stock
    print("\n📋 Scenario 1: RELIANCE Stock Analysis")
    result = crew.kickoff(inputs={"stock": "RELIANCE"})

    # Scenario 2: Analyze another stock (commented for now)
    # print("\n📋 Scenario 2: TCS Stock Analysis")
    # result = crew.kickoff(inputs={"stock": "TCS"})

    print("\n🎉 Financial analysis completed!")
