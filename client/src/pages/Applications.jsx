import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="applications-page">
      <nav className="navbar">
        <h1>JobTrack</h1>

        <Link to="/dashboard">← Dashboard</Link>
      </nav>

      <main className="applications-content">
        <div className="page-header">
          <div>
            <h2>My Applications</h2>
            <p>View and manage all your job applications.</p>
          </div>

          <Link to="/add-job" className="add-job-button">
            + Add Application
          </Link>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search company or job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <p>Loading applications...</p>
        ) : filteredJobs.length === 0 ? (
          <div className="empty-state">
            <h3>No applications found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        ) : (
          <div className="applications-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Application Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.company}</td>
                    <td>{job.jobTitle}</td>
                    <td>{job.location || "-"}</td>
                    <td>{job.jobType}</td>
                    <td>
                      <span
                        className={`status ${job.status.toLowerCase()}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>
                      {job.applicationDate
                        ? new Date(
                            job.applicationDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <Link to={`/edit-job/${job._id}`}>
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Applications;