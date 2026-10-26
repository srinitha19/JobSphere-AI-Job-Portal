import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./SavedJobs.css";

function SavedJobs() {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("savedJobs")) || []
  );

  const removeJob = (id) => {
    const updatedJobs = savedJobs.filter(
      (job) => job.id !== id
    );

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    setSavedJobs(updatedJobs);
  };

  const viewJob = (job) => {
    navigate(`/job/${job.id}`, {
      state: { job },
    });
  };

  const applyJob = (job) => {
    navigate(`/apply/${job.id}`, {
      state: { job },
    });
  };

  return (
    <>
      <Navbar />

      <div className="saved-container">

        <h1>Saved Jobs</h1>

        {savedJobs.length === 0 ? (
          <div className="no-saved-jobs">

            <h2>No Saved Jobs</h2>

            <p>
              Save jobs from the Jobs page to see them here.
            </p>

            <button
              onClick={() => navigate("/jobs")}
            >
              Browse Jobs
            </button>

          </div>
        ) : (
          <div className="saved-grid">

            {savedJobs.map((job) => (

              <div
                className="saved-card"
                key={job.id}
              >

                <h3>{job.title}</h3>

                <p>
                  🏢 {job.companyName || job.company}
                </p>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  🕒{" "}
                  {job.postedDate ||
                    job.postedTimeAgo ||
                    "Recently posted"}
                </p>

                <div className="saved-buttons">

                  <button
                    onClick={() => viewJob(job)}
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => applyJob(job)}
                    className="apply-button"
                  >
                    Apply
                  </button>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default SavedJobs;