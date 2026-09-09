import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const stats = {
    total: jobs.length,
    applied: jobs.filter((job) => job.status === "Applied").length,
    screening: jobs.filter((job) => job.status === "Screening").length,
    interview: jobs.filter((job) => job.status === "Interview").length,
    selected: jobs.filter((job) => job.status === "Selected").length,
    rejected: jobs.filter((job) => job.status === "Rejected").length,
  };

  const chartData =
    stats.total === 0
      ? [{ name: "No Applications", value: 1 }]
      : [
          { name: "Applied", value: stats.applied },
          { name: "Screening", value: stats.screening },
          { name: "Interview", value: stats.interview },
          { name: "Selected", value: stats.selected },
          { name: "Rejected", value: stats.rejected },
        ];

  // Get upcoming interviews
  const upcomingInterviews = jobs
    .filter(
      (job) =>
        job.interviewDate &&
        new Date(job.interviewDate) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.interviewDate) -
        new Date(b.interviewDate)
    )
    .slice(0, 5);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>JobTrack</h1>

        <div>
          <span>Hi, {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard-content">

        {/* Header */}
<div className="dashboard-header">
  <div className="dashboard-title">
    <h2>Dashboard</h2>
    <p>Track and manage your job applications.</p>
  </div>

 <div className="dashboard-actions">
  <Link to="/add-job" className="add-job-button">
    + Add Application
  </Link>

  <Link to="/resumes" className="resume-button">
    📄 Resume Manager
  </Link>

  <Link to="/interview-prep" className="prep-button">
    ✅ Interview Prep
  </Link>
</div>
</div>

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Applications</h3>
            <strong>{stats.total}</strong>
          </div>

          <div className="stat-card">
            <h3>Applied</h3>
            <strong>{stats.applied}</strong>
          </div>

          <div className="stat-card">
            <h3>Screening</h3>
            <strong>{stats.screening}</strong>
          </div>

          <div className="stat-card">
            <h3>Interviews</h3>
            <strong>{stats.interview}</strong>
          </div>

          <div className="stat-card">
            <h3>Selected</h3>
            <strong>{stats.selected}</strong>
          </div>

          <div className="stat-card">
            <h3>Rejected</h3>
            <strong>{stats.rejected}</strong>
          </div>

        </div>

        {/* Analytics */}

        <section className="analytics-section">

          <div className="section-header">
            <div>
              <h2>Application Analytics</h2>
              <p>Overview of your application pipeline.</p>
            </div>
          </div>

          <div className="chart-container">

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>

                <Pie
  data={chartData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={120}
  innerRadius={65}
  paddingAngle={3}
  label
>
                 {chartData.map((entry, index) => {
  const COLORS = [
  "#2563eb", // Applied - blue
  "#f59e0b", // Screening - orange
  "#9333ea", // Interview - purple
  "#16a34a", // Selected - green
  "#dc2626", // Rejected - red
];

  return (
    <Cell
      key={`cell-${index}`}
      fill={COLORS[index % COLORS.length]}
    />
  );
})}
                </Pie>
<text
  x="50%"
  y="48%"
  textAnchor="middle"
  dominantBaseline="middle"
  fontSize="28"
  fontWeight="700"
  fill="#1f2937"
>
  {stats.total}
</text>

<text
  x="50%"
  y="58%"
  textAnchor="middle"
  fill="#6b7280"
  fontSize="14"
>
  Applications
</text>
               <Tooltip
  formatter={(value) => [`${value} applications`, "Count"]}
/>
                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </section>

        {/* Upcoming Interviews */}

        <section className="interviews-section">

          <div className="section-header">
            <div>
              <h2>🔔 Upcoming Interviews</h2>
              <p>Stay prepared for your upcoming interviews.</p>
            </div>
          </div>

          {upcomingInterviews.length === 0 ? (

            <div className="empty-state">
              <h3>No upcoming interviews</h3>
              <p>
                Add an interview date to an application to see
                it here.
              </p>
            </div>

          ) : (

            <div className="interview-list">

              {upcomingInterviews.map((job) => (

                <div
                  className="interview-card"
                  key={job._id}
                >

                  <div>
                    <h3>{job.jobTitle}</h3>
                    <p>{job.company}</p>

                    <small>
                      {job.location || "Location not specified"}
                    </small>
                  </div>

                  <div className="interview-date">

                    <strong>
                      {new Date(
                        job.interviewDate
                      ).toLocaleDateString()}
                    </strong>

                    <span>
                      {new Date(
                        job.interviewDate
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Recent Applications */}

        <section className="applications-section">

          <div className="section-header">
            <h2>Recent Applications</h2>
            <Link to="/applications">View All</Link>
          </div>

          {loading ? (

            <p>Loading applications...</p>

          ) : jobs.length === 0 ? (

            <div className="empty-state">
              <h3>No applications yet</h3>

              <p>
                Add your first job application to start tracking.
              </p>

              <Link to="/add-job">
                Add Application
              </Link>
            </div>

          ) : (

            <div className="application-list">

              {jobs.slice(0, 5).map((job) => (

                <div
                  className="application-card"
                  key={job._id}
                >

                  <div>
                    <h3>{job.jobTitle}</h3>

                    <p>{job.company}</p>

                    <small>
                      {job.location || "Location not specified"}
                    </small>
                  </div>

                  <span
                    className={`status ${job.status.toLowerCase()}`}
                  >
                    {job.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>
    </div>
  );
};

export default Dashboard;