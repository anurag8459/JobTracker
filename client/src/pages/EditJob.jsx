import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditJob = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/jobs/${id}`);
        const job = response.data;

        setFormData({
          company: job.company || "",
          jobTitle: job.jobTitle || "",
          location: job.location || "",
          jobType: job.jobType || "Full-time",
          status: job.status || "Applied",
          applicationDate: job.applicationDate
            ? job.applicationDate.split("T")[0]
            : "",
          interviewDate: job.interviewDate
            ? job.interviewDate.slice(0, 16)
            : "",
          interviewNotes: job.interviewNotes || "",
          notes: job.notes || "",
        });
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load application"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await API.put(`/jobs/${id}`, formData);
      navigate("/applications");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update application"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading application...</p>;
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Edit Job Application</h1>
        <p>Update your application details.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
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
            value={formData.interviewNotes}
            onChange={handleChange}
            rows="4"
          />

          <label>Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/applications")}
            >
              Cancel
            </button>

            <button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;