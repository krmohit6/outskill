import os

from crewai import Crew, Process

from agents import issue_investigator, log_analyzer, solution_specialist
from tasks import analyze_logs_task, investigate_issue_task, provide_solution_task

# Define the DevOps crew with agents and tasks in sequential process
devops_crew = Crew(
    agents=[log_analyzer, issue_investigator, solution_specialist],
    tasks=[analyze_logs_task, investigate_issue_task, provide_solution_task],
    verbose=True,
    process=Process.sequential,
)


def analyze_devops_issue(log_file_path):
    """Analyze a DevOps issue from log file"""

    print(f"\n{'='*60}")
    print(f"ANALYZING DEVOPS ISSUE FROM: {log_file_path}")
    print(f"{'='*60}")

    # Run the crew with the log file path
    result = devops_crew.kickoff(inputs={"log_file_path": log_file_path})

    print(f"\n{'='*60}")
    print("ANALYSIS COMPLETE")
    print(f"{'='*60}")

    return result


if __name__ == "__main__":
    # Example 1: Analyze Kubernetes deployment error
    print("🚀 Starting DevOps Issue Analysis...")

    # Analyze the Kubernetes deployment issue
    result = analyze_devops_issue("../dummy_logs/kubernetes_deployment_error.log")

    # Analyze the database connection issue
    # result = analyze_devops_issue("../dummy_logs/database_connection_error.log")

    print("\n🎉 DevOps analysis completed!")
