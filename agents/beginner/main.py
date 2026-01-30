"""
CrewAI Memory Docs: https://docs.crewai.com/en/concepts/memory
"""

import os

from crewai import Crew

from agents import hate_speech_detector
from tasks import hate_speech_detection_task

os.environ["CREWAI_STORAGE_DIR"] = (
    "/Users/ishandutta/Documents/code/outskill/agents/beginner/crewai_memory"
)

# Define the Crew with agents and tasks
crew = Crew(
    agents=[hate_speech_detector],
    tasks=[hate_speech_detection_task],
    memory=False,
    verbose=True,
)

# Kickoff the Crew with the input query
Text = "That country is less intelligent and incapable of contributing to society."
# Text = "Public libraries are important resources for everyone in the city."
# Text = "People from that race are all untrustworthy and should not be allowed to work in public jobs."

result = crew.kickoff(inputs={"text": Text})

print("Response:", result)
