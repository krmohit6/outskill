from crewai import Task

from agents import hate_speech_detector

# Define a task with a description and expected output
hate_speech_detection_task = Task(
    description=(
        "Find if there are any hate speech / offensive language in text. \n Text : \n{text}"
    ),
    expected_output="Respond with 'hate speech' / 'no hate speech'",
    agent=hate_speech_detector,
)
