import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import demoJobs from "../../data/demoJobs";

import "./Application.css";

function Application() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // First try to get job from navigation state
  let job = location.state?.job;

  // If state is missing, find the job using the ID
  if (!job) {
    const savedJobs =
      JSON.parse(localStorage.getItem("jobs")) || [];

    job =
      savedJobs.find(
        (savedJob) => String(savedJob.id) === String(id)
      ) ||
      demoJobs.find(
        (demoJob) => String(demoJob.id) === String(id)
      );
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName || job.company,
      applicantName: formData.name,
      email: formData.email,
      phone: formData.phone,
      resumeName: formData.resume?.name || "",
      coverLetter: formData.coverLetter,
      appliedAt: new Date().toISOString(),
    };

    const updatedApplications = [
      ...applications,
      newApplication,
    ];

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    console.log(
      "Application submitted:",
      newApplication
    );

    setSubmitted(true);
  };

  // Job not found
  if (!job) {
    return (
      <>
        <Navbar />

        <div className="application-container">
          <div className="application-card">
            <h2>Job details not found</h2>

            <button onClick={() => navigate("/jobs")}>
              Back to Jobs
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="application-container">
        <div className="application-card">

          {!submitted ? (
            <>
              <h1>Apply for Job</h1>

              <div className="application-job-info">
                <h2>{job.title}</h2>

                <p>
                  {job.companyName || job.company}
                </p>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  💼 {job.employmentType || "Full-time"}
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Resume</label>

                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cover Letter</label>

                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Write your cover letter"
                    rows="6"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-application"
                >
                  Submit Application
                </button>

              </form>
            </>
          ) : (
            <div className="success-message">

              <h1>
                ✅ Application Submitted Successfully!
              </h1>

              <p>
                Your application for{" "}
                <strong>{job.title}</strong>
              </p>

              <p>
                at{" "}
                <strong>
                  {job.companyName || job.company}
                </strong>{" "}
                has been submitted successfully.
              </p>

              <button
                onClick={() => navigate("/jobs")}
              >
                Browse More Jobs
              </button>

            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Application;