import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AddJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    location: "",
    jobType: "Full-time",
    status: "Applied",
    applicationDate: "",
    interviewDate: "",
    interviewNotes: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/jobs", formData);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Add Job Application</h1>

        <p>
          Save the details of a new job application.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Company</label>

          <input
            type="text"
            name="company"
            placeholder="e.g. Google"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <label>Job Title</label>

          <input
            type="text"
            name="jobTitle"
            placeholder="e.g. Software Engineer"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />

          <label>Location</label>

          <input
            type="text"
            name="location"
            placeholder="e.g. Bengaluru / Remote"
            value={formData.location}
            onChange={handleChange}
          />

          <label>Job Type</label>

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Applied</option>
            <option>Screening</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <label>Application Date</label>

          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
          />

          <label>Interview Date</label>

          <input
            type="datetime-local"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
          />

          <label>Interview Notes</label>

          <textarea
            name="interviewNotes"
            placeholder="Add interview-related notes..."
            value={formData.interviewNotes}
            onChange={handleChange}
            rows="4"
          />

          <label>Additional Notes</label>

          <textarea
            name="notes"
            placeholder="Add any other notes..."
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;