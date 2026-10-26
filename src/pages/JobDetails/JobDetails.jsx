import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./JobDetails.css";

function JobDetails() {
  const location=useLocation();
  const navigate=useNavigate();

  const job=location.state?.job;

  if(!job) {
    return (
      <>
        <Navbar/>
        
        <div className="job-details-container">
          <h2>Job details not found</h2>

          <button onClick={()=>navigate("/jobs")}>
            Back to Jobs
          </button>
        </div>

        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />

      <div className="job-details-container">
        <div className="job-details-card">
          <h1>{job.title}</h1>
          <h2>{job.companyName}</h2>
          <p>
          📍 <strong>Location:</strong> {job.location}
          </p>
          <p>
          🕒 <strong>Posted:</strong> {job.postedTimeAgo}
          </p>
          <p>
          📅 <strong>Date Posted:</strong> {job.datePosted}
          </p>

          <div className="job-details-buttons">
            <button className="apply-button" onClick={()=> navigate("/apply", {state: {job}})}>
              Apply Now
            </button>

            <button onClick={()=> navigate("/jobs")}>
              Back to Jobs
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default JobDetails;