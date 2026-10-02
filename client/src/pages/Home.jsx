import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-navbar">

        <div className="home-logo">
          <div className="logo-icon">J</div>
          <span>JobTrack</span>
        </div>

        <div className="home-nav-links">
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-signup">
            Get Started
          </Link>
        </div>

      </nav>

      {/* Hero */}
      <main className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            Smart Job Search Management
          </div>

          <h1>
            Your Job Search.
            <br />
            <span>Organized & Simplified.</span>
          </h1>

          <p>
            Track every application, never miss an interview,
            and keep your career journey organized — all from
            one powerful dashboard.
          </p>

          <div className="hero-actions">

            <Link
              to="/register"
              className="primary-button"
            >
              Start Tracking Free
              <span>→</span>
            </Link>

            <Link
              to="/login"
              className="secondary-button"
            >
              Sign In
            </Link>

          </div>

          <div className="trust-text">
            <span>✓</span> Simple to use
            <span>✓</span> All your applications in one place
          </div>

        </div>

        {/* Dashboard Preview */}
        <div className="hero-preview">

          <div className="preview-window">

            <div className="preview-topbar">

              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="preview-title">
                JobTrack Dashboard
              </div>

            </div>

            <div className="preview-body">

              <div className="preview-sidebar">

                <div className="preview-brand">
                  JobTrack
                </div>

                <div className="sidebar-item active">
                  ▦ Dashboard
                </div>

                <div className="sidebar-item">
                  ◉ Applications
                </div>

                <div className="sidebar-item">
                  ◫ Interviews
                </div>

                <div className="sidebar-item">
                  ▤ Resume
                </div>

              </div>

              <div className="preview-main">

                <div className="preview-heading">
                  <div>
                    <h3>Good morning 👋</h3>
                    <p>Here's your job search overview.</p>
                  </div>

                  <div className="preview-add">
                    + Add Application
                  </div>
                </div>

                <div className="preview-stats">

                  <div className="preview-card">
                    <span>Total Applications</span>
                    <strong>24</strong>
                    <small>↑ 12% this month</small>
                  </div>

                  <div className="preview-card">
                    <span>Interviews</span>
                    <strong>6</strong>
                    <small>2 this week</small>
                  </div>

                  <div className="preview-card">
                    <span>Selected</span>
                    <strong>2</strong>
                    <small>8.3% success rate</small>
                  </div>

                </div>

                <div className="preview-bottom">

                  <div className="preview-chart">

                    <div className="preview-section-title">
                      Application Analytics
                    </div>

                    <div className="fake-chart">

                      <div className="chart-bars">
                        <span style={{ height: "45%" }}></span>
                        <span style={{ height: "70%" }}></span>
                        <span style={{ height: "55%" }}></span>
                        <span style={{ height: "85%" }}></span>
                        <span style={{ height: "65%" }}></span>
                        <span style={{ height: "95%" }}></span>
                      </div>

                    </div>

                  </div>

                  <div className="preview-interviews">

                    <div className="preview-section-title">
                      Upcoming Interviews
                    </div>

                    <div className="mini-interview">
                      <div className="company-icon">
                        G
                      </div>

                      <div>
                        <strong>Software Engineer</strong>
                        <span>Google · Tomorrow</span>
                      </div>
                    </div>

                    <div className="mini-interview">
                      <div className="company-icon">
                        M
                      </div>

                      <div>
                        <strong>Frontend Developer</strong>
                        <span>Microsoft · Friday</span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Features */}
      <section className="features-section">

        <p className="features-label">
          EVERYTHING YOU NEED
        </p>

        <h2>
          One place for your entire job search.
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Applications</h3>
            <p>
              Keep every application organized with
              statuses, companies, roles and notes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Never Miss Interviews</h3>
            <p>
              Keep upcoming interviews visible and
              stay prepared for every opportunity.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Manage Your Resume</h3>
            <p>
              Upload and manage your resume directly
              inside your job search workspace.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="home-cta">

        <h2>
          Ready to organize your job search?
        </h2>

        <p>
          Start tracking your applications today.
        </p>

        <Link to="/register">
          Get Started →
        </Link>

      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-logo">
          <div className="logo-icon">J</div>
          <span>JobTrack</span>
        </div>

        <p>
          © 2026 JobTrack. Built to simplify your job search.
        </p>
      </footer>

    </div>
  );
};

export default Home;