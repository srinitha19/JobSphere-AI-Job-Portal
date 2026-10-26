import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(() => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    return savedJobs.some(
      (savedJob) => savedJob.id === job.id
    );
  });

  const handleViewDetails = () => {
    navigate(`/job/${job.id}`, {
      state: { job },
    });
  };

  const handleApply = () => {
    console.log("APPLY JOB:", job);
    console.log("APPLY JOB ID:", job.id);

    navigate(`/apply/${job.id}`, {
      state: {job},
    });
  };

  const handleSaveJob = () => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    const alreadySaved = savedJobs.some(
      (savedJob) => savedJob.id === job.id
    );

    if (alreadySaved) {
      const updatedJobs = savedJobs.filter(
        (savedJob) => savedJob.id !== job.id
      );

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setIsSaved(false);
    } else {
      const updatedJobs = [...savedJobs, job];

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setIsSaved(true);
    }
  };

  return (
    <div className="job-card">

      <h2>{job.title}</h2>

      <h3>{job.companyName || job.company}</h3>

      <p>📍 {job.location}</p>

      <p>🕒 {job.postedDate || job.postedTimeAgo || "Recently posted"}</p>

      <div className="job-buttons">

        <button onClick={handleViewDetails}>
          View Details
        </button>

        <button
          onClick={handleSaveJob}
          className="save-button"
        >
          {isSaved ? "❤️ Saved" : "♡ Save"}
        </button>

        <button
          onClick={handleApply}
          className="apply-button"
        >
          Apply
        </button>

      </div>

    </div>
  );
}

export default JobCard;