import { useEffect, useState } from "react";
import API from "../services/api";

const ResumeManager = () => {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Get saved resume when page opens
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await API.get("/resumes");
        setResume(response.data.resume);
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchResume();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a PDF resume.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await API.post(
        "/resumes/upload",
        formData
      );

      setResume(response.data.resume);
      setMessage("Resume uploaded successfully!");
      setFile(null);

      e.target.reset();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to upload resume"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete("/resumes");

      setResume(null);
      setMessage("Resume deleted successfully.");
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete resume"
      );
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Resume Manager</h1>

        <p>
          Upload and manage your resume for your job applications.
        </p>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleUpload}>
          <label>Select Resume</label>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>
        </form>

        {fetching ? (
          <p>Loading resume...</p>
        ) : resume ? (
          <div className="resume-card">
            <h3>Uploaded Resume</h3>

            <p>{resume.originalName}</p>

            <div className="resume-actions">
              <a
                href={`http://localhost:5000${resume.path}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>

              <button onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h3>No resume uploaded</h3>
            <p>Upload your PDF resume to manage it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeManager;