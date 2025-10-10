#!/usr/bin/env python3
"""
CrewAI Memory Explorer

A unified, user-friendly script to explore and visualize CrewAI memory storage.
Simply provide the path to your CrewAI memory folder and get a comprehensive overview.

Usage:
    python crewai_memory_explorer.py [memory_folder_path]

If no path is provided, it will use the default location.
"""

import json
import os
import sqlite3
import sys
from datetime import datetime
from pathlib import Path


class CrewAIMemoryExplorer:
    """Explores and visualizes CrewAI memory storage in a user-friendly way."""

    def __init__(self, memory_path=None):
        """
        Initialize the memory explorer.

        Args:
            memory_path (str, optional): Path to the CrewAI memory directory
        """
        if memory_path:
            self.memory_dir = Path(memory_path)
        else:
            # Default path - assumes script is run from the agents directory
            self.memory_dir = Path("beginner/crewai_memory")

        self.stats = {
            "task_outputs": 0,
            "long_term_memories": 0,
            "agents": set(),
            "total_embeddings": 0,
        }

    def normalize_agent_name(self, agent_name):
        """Normalize agent names to handle variations like spaces vs underscores."""
        return agent_name.replace("_", " ").strip()

    def print_header(self, title, char="=", width=80):
        """Print a formatted header."""
        print(f"\n{char * width}")
        print(f"{title:^{width}}")
        print(f"{char * width}")

    def print_section(self, title, char="-", width=60):
        """Print a formatted section header."""
        print(f"\n{title}")
        print(char * width)

    def print_explanation(self, text, indent=""):
        """Print explanation text with proper formatting."""
        print(f"{indent}💭 {text}")
        print()

    def explore_task_outputs(self):
        """Explore and display task execution outputs."""
        self.print_section("📋 TASK EXECUTION HISTORY")
        self.print_explanation(
            "This section shows the actual task executions that have been run. Each execution "
            "includes the input data, expected output, actual result, and which agent performed the task. "
            "This is your execution log - a record of what your CrewAI agents have actually done."
        )

        kickoff_db = self.memory_dir / "latest_kickoff_task_outputs.db"

        if not kickoff_db.exists():
            print("❌ No task outputs database found.")
            return

        try:
            conn = sqlite3.connect(str(kickoff_db))
            cursor = conn.cursor()

            cursor.execute(
                "SELECT * FROM latest_kickoff_task_outputs ORDER BY timestamp DESC"
            )
            outputs = cursor.fetchall()

            if not outputs:
                print("📭 No task executions recorded yet.")
                conn.close()
                return

            self.stats["task_outputs"] = len(outputs)

            print(f"🎯 Total Task Executions: {len(outputs)}")
            print()

            for i, output in enumerate(outputs, 1):
                (
                    task_id,
                    expected_output,
                    task_output,
                    task_index,
                    inputs,
                    was_replayed,
                    timestamp,
                ) = output

                print(f"🔸 Execution #{i}")
                print(f"   🎯 Expected: {expected_output}")

                # Parse task output
                try:
                    output_data = json.loads(task_output)
                    actual_output = output_data.get("raw", "N/A")
                    agent_name = output_data.get("agent", "Unknown")
                    task_desc = output_data.get("description", "N/A")

                    print(f"   ✅ Result: {actual_output}")
                    print(f"   🤖 Agent: {agent_name}")

                    # Normalize agent name for counting
                    normalized_agent = self.normalize_agent_name(agent_name)
                    self.stats["agents"].add(normalized_agent)

                    # Show task description (truncated)
                    if len(task_desc) > 100:
                        print(f"   📝 Task: {task_desc[:100]}...")
                    else:
                        print(f"   📝 Task: {task_desc}")

                except json.JSONDecodeError:
                    print(f"   ✅ Result: {task_output}")

                # Parse inputs
                try:
                    input_data = json.loads(inputs)
                    if "text" in input_data:
                        input_text = input_data["text"]
                        if len(input_text) > 150:
                            print(f'   📥 Input: "{input_text[:150]}..."')
                        else:
                            print(f'   📥 Input: "{input_text}"')
                except:
                    if len(inputs) > 100:
                        print(f"   📥 Input: {inputs[:100]}...")
                    else:
                        print(f"   📥 Input: {inputs}")

                if was_replayed:
                    print(f"   🔄 Note: This was a replayed execution")

                print()

            conn.close()

        except Exception as e:
            print(f"❌ Error reading task outputs: {e}")

    def explore_long_term_memory(self):
        """Explore and display long-term memory."""
        self.print_section("🧠 LONG-TERM MEMORY & LEARNING")
        self.print_explanation(
            "Long-term memory stores lessons learned from past task executions. CrewAI's AI system "
            "analyzes each task performance and generates quality scores (0-10) and improvement suggestions. "
            "This helps agents get better over time by learning from experience. Higher quality scores "
            "indicate better task performance."
        )

        long_term_db = self.memory_dir / "long_term_memory_storage.db"

        if not long_term_db.exists():
            print("❌ No long-term memory database found.")
            return

        try:
            conn = sqlite3.connect(str(long_term_db))
            cursor = conn.cursor()

            cursor.execute("SELECT * FROM long_term_memories ORDER BY datetime DESC")
            memories = cursor.fetchall()

            if not memories:
                print("🧭 No long-term memories stored yet.")
                conn.close()
                return

            self.stats["long_term_memories"] = len(memories)

            print(f"💾 Total Memories Stored: {len(memories)}")
            print()

            for i, memory in enumerate(memories, 1):
                id_val, task_desc, metadata, datetime_str, score = memory

                print(f"🔸 Memory #{i}")
                print(f"   ⭐ Quality Score: {score}/10.0")

                # Show task description (truncated for readability)
                if len(task_desc) > 120:
                    print(f"   📝 Task: {task_desc[:120]}...")
                else:
                    print(f"   📝 Task: {task_desc}")

                # Parse metadata for insights
                try:
                    meta_data = json.loads(metadata)
                    agent_name = meta_data.get("agent", "Unknown")
                    expected = meta_data.get("expected_output", "N/A")

                    print(f"   🤖 Agent: {agent_name}")
                    print(f"   🎯 Expected Output: {expected}")

                    # Normalize agent name for counting
                    normalized_agent = self.normalize_agent_name(agent_name)
                    self.stats["agents"].add(normalized_agent)

                    # Show AI suggestions for improvement
                    if "suggestions" in meta_data and meta_data["suggestions"]:
                        suggestions = meta_data["suggestions"]
                        print(f"   💡 AI Suggestions ({len(suggestions)}):")

                        for j, suggestion in enumerate(suggestions[:2], 1):
                            print(f"      {j}. {suggestion}")

                        if len(suggestions) > 2:
                            print(
                                f"      ... and {len(suggestions) - 2} more suggestions"
                            )

                except json.JSONDecodeError:
                    print(f"   📊 Raw Metadata: {metadata[:100]}...")

                print()

            conn.close()

        except Exception as e:
            print(f"❌ Error reading long-term memory: {e}")

    def explore_vector_memory(self):
        """Explore vector embeddings and semantic memory."""
        self.print_section("🔍 VECTOR MEMORY & SEMANTIC STORAGE")
        self.print_explanation(
            "Vector memory stores semantic embeddings (mathematical representations) of concepts, entities, "
            "and context from your tasks. This allows agents to understand relationships between ideas and "
            "retrieve relevant context. Entity Memory persists across sessions, while Short-term Memory "
            "is cleared after each run. The embeddings help agents understand meaning, not just exact text matches."
        )

        memory_types = [
            ("🏛️ Entity Memory", "entities"),
            ("⚡ Short-term Memory", "short_term"),
        ]

        total_embeddings = 0

        for mem_type_name, mem_dir_name in memory_types:
            mem_path = self.memory_dir / mem_dir_name

            if not mem_path.exists():
                print(f"{mem_type_name}: ❌ Directory not found")
                continue

            print(f"{mem_type_name}:")

            agent_dirs = [d for d in mem_path.iterdir() if d.is_dir()]

            if not agent_dirs:
                print("   📭 No agent memory found")
                continue

            for agent_dir in agent_dirs:
                agent_name = agent_dir.name
                display_name = self.normalize_agent_name(agent_name)
                print(f"   🤖 Agent: {display_name}")

                # Normalize agent name for counting
                self.stats["agents"].add(display_name)

                # Check ChromaDB for embeddings
                chroma_db = agent_dir / "chroma.sqlite3"
                if chroma_db.exists():
                    try:
                        conn = sqlite3.connect(str(chroma_db))
                        cursor = conn.cursor()

                        # Count embeddings
                        cursor.execute("SELECT COUNT(*) FROM embeddings")
                        embedding_count = cursor.fetchone()[0]
                        total_embeddings += embedding_count

                        print(f"      📊 Embeddings: {embedding_count}")

                        # Get sample content from metadata
                        cursor.execute(
                            """
                            SELECT string_value 
                            FROM embedding_metadata 
                            WHERE key = 'chroma:document' 
                            LIMIT 3
                        """
                        )
                        samples = cursor.fetchall()

                        if samples:
                            print(f"      📄 Sample Content:")
                            for j, (content,) in enumerate(samples, 1):
                                if len(content) > 80:
                                    print(f"         {j}. {content[:80]}...")
                                else:
                                    print(f"         {j}. {content}")

                        conn.close()

                    except Exception as e:
                        print(f"      ❌ Error reading embeddings: {e}")

                # Count vector index files
                vector_dirs = [
                    d
                    for d in agent_dir.iterdir()
                    if d.is_dir() and d.name != "__pycache__"
                ]
                for vec_dir in vector_dirs:
                    try:
                        file_count = len(list(vec_dir.iterdir()))
                        print(f"      🗂️ Vector Index: {file_count} files")
                    except:
                        pass

            print()

        self.stats["total_embeddings"] = total_embeddings

    def show_summary_statistics(self):
        """Display overall statistics and insights."""
        self.print_section("📊 MEMORY STATISTICS & INSIGHTS")
        self.print_explanation(
            "This summary shows the overall health and activity of your CrewAI memory system. "
            "It counts total executions, stored memories, vector embeddings, and active agents. "
            "The health check verifies that all memory components are working properly. More "
            "executions and memories indicate a more experienced and capable AI system."
        )

        print(f"🎯 Task Executions: {self.stats['task_outputs']}")
        print(f"🧠 Long-term Memories: {self.stats['long_term_memories']}")
        print(f"🔍 Total Vector Embeddings: {self.stats['total_embeddings']}")
        print(f"🤖 Active Agents: {len(self.stats['agents'])}")

        if self.stats["agents"]:
            print(f"   Agent Names: {', '.join(sorted(self.stats['agents']))}")

        print()

        # Memory health check
        print("🏥 Memory Health Check:")

        if self.stats["task_outputs"] > 0:
            print("   ✅ Task execution tracking is working")
        else:
            print("   ⚠️ No task executions recorded")

        if self.stats["long_term_memories"] > 0:
            print("   ✅ Long-term learning is active")
        else:
            print("   ⚠️ No long-term memories stored")

        if self.stats["total_embeddings"] > 0:
            print("   ✅ Vector memory is functioning")
        else:
            print("   ⚠️ No vector embeddings found")

        if len(self.stats["agents"]) > 0:
            print(f"   ✅ {len(self.stats['agents'])} agent(s) have memory enabled")
        else:
            print("   ⚠️ No agents found with memory")

    def explore_memory(self):
        """Main method to explore all memory components."""
        if not self.memory_dir.exists():
            print(f"❌ Memory directory not found: {self.memory_dir}")
            print("Please check the path and try again.")
            return

        self.print_header("🧠 CrewAI Memory Explorer", "=", 80)
        print(f"📁 Memory Location: {self.memory_dir}")
        self.print_explanation(
            "This tool analyzes your CrewAI memory storage to show what your agents have learned "
            "and remembered. Memory helps agents improve performance over time by storing execution "
            "history, learning from mistakes, and building contextual understanding."
        )

        # Explore all memory components
        self.explore_task_outputs()
        self.explore_long_term_memory()
        self.explore_vector_memory()
        self.show_summary_statistics()

        self.print_header("✨ Analysis Complete!", "=", 80)
        print("💡 Tip: Run your CrewAI script more times to see memory evolution!")
        print(
            "🔄 Re-run this explorer after each execution to track learning progress."
        )


def main():
    """Main function to handle command line arguments and run the explorer."""
    print("🚀 CrewAI Memory Explorer")
    print("=" * 40)

    # Handle command line arguments
    if len(sys.argv) > 1:
        memory_path = sys.argv[1]
        print(f"📁 Using provided path: {memory_path}")
    else:
        memory_path = None
        print("📁 Using default memory location")

    # Create and run explorer
    explorer = CrewAIMemoryExplorer(memory_path)
    explorer.explore_memory()


if __name__ == "__main__":
    main()
