import { useState } from "react";

const InterviewPrep = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Research the company", completed: false },
    { id: 2, text: "Review job description", completed: false },
    { id: 3, text: "Prepare technical questions", completed: false },
    { id: 4, text: "Prepare HR questions", completed: false },
    { id: 5, text: "Review resume", completed: false },
    { id: 6, text: "Prepare questions for interviewer", completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Interview Preparation</h1>

        <p>
          Complete your checklist before your next interview.
        </p>

        <div className="prep-progress">
          <strong>
            {completedTasks} / {tasks.length} completed
          </strong>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(completedTasks / tasks.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="prep-list">
          {tasks.map((task) => (
            <label
              className={`prep-task ${
                task.completed ? "completed" : ""
              }`}
              key={task.id}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              <span>{task.text}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;