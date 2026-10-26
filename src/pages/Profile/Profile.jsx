import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {
      name: "",
      email: "",
    };

  const savedJobs =
    JSON.parse(localStorage.getItem("savedJobs")) || [];

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const [user, setUser] = useState(storedUser);

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(
    storedUser.name || ""
  );

  const [email, setEmail] = useState(
    storedUser.email || ""
  );

  const [resume, setResume] = useState(
    localStorage.getItem("resumeName") || ""
  );

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: name,
      email: email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleResume = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResume(file.name);

      localStorage.setItem(
        "resumeName",
        file.name
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">

        {/* PROFILE CARD */}

        <div className="profile-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
          />

          {!isEditing ? (
            <>
              <h2>
                {user.name || "User"}
              </h2>

              <p>
                {user.email ||
                  "No email available"}
              </p>

              <button
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form
              onSubmit={handleSaveProfile}
            >

              <div>
                <label>Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <button type="submit">
                Save Profile
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsEditing(false)
                }
              >
                Cancel
              </button>

            </form>
          )}

        </div>

        {/* DASHBOARD */}

        <div className="dashboard-card">

          <h2>Dashboard</h2>

          <div className="stats">

            <div
              className="box"
              onClick={() =>
                navigate("/saved")
              }
              style={{
                cursor: "pointer",
              }}
            >
              <h3>
                {savedJobs.length}
              </h3>

              <p>Saved Jobs</p>
            </div>

            <div className="box">

              <h3>
                {applications.length}
              </h3>

              <p>Applied Jobs</p>

            </div>

            <div className="box">

              <h3>
                {user.name &&
                user.email &&
                resume
                  ? "100%"
                  : "70%"}
              </h3>

              <p>
                Profile Complete
              </p>

            </div>

          </div>

          {/* RESUME */}

          <div className="resume-section">

            <h3>Upload Resume</h3>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResume}
            />

            {resume && (
              <p>
                Uploaded:{" "}
                <strong>
                  {resume}
                </strong>
              </p>
            )}

          </div>

        </div>

        {/* MY APPLICATIONS */}

        <div className="applications-section">

          <h2>My Applications</h2>

          {applications.length === 0 ? (

            <div className="no-applications">

              <h3>
                No Applications Yet
              </h3>

              <p>
                Apply for jobs to see your
                applications here.
              </p>

              <button
                onClick={() =>
                  navigate("/jobs")
                }
              >
                Browse Jobs
              </button>

            </div>

          ) : (

            <div className="applications-list">

              {applications
                .slice()
                .reverse()
                .map((application) => (

                  <div
                    className="application-item"
                    key={application.id}
                  >

                    <div>

                      <h3>
                        {application.jobTitle}
                      </h3>

                      <p>
                        🏢{" "}
                        {application.companyName}
                      </p>

                      <p>
                        📅 Applied:{" "}
                        {formatDate(
                          application.appliedAt
                        )}
                      </p>

                    </div>

                    <div className="application-status">

                      <span>
                        Submitted
                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Profile;