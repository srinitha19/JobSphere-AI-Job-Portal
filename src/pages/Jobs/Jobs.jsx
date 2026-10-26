import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import JobCard from "../../components/JobCard/JobCard";
import JobSearch from "../../components/SearchBar/JobSearch";
import demoJobs from "../../data/demoJobs";

import "./Jobs.css";

function Jobs() {
  const location = useLocation();
  const companyFilter = location.state?.company || "";
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await api.get("/v2/linkedin/search", {
        params: {
          query: "software developer",
          location: "India",
          datePosted: "month",
          workplaceTypes: "remote;hybrid;onSite",
          experienceLevels: "entry;associate",
          employmentTypes: "fulltime;parttime;intern",
        },
      });

      console.log("FULL API RESPONSE:", response);
      console.log("API RESPONSE DATA:", response.data);

      let jobList = [];

      if (Array.isArray(response.data)) {
        jobList = response.data;
      } 
      else if (Array.isArray(response.data.jobs)) {
        jobList = response.data.jobs;
      } 
      else if (
        response.data["data.aggregated_response"] &&
        Array.isArray(response.data["data.aggregated_response"])
      ) {
        jobList =
          response.data["data.aggregated_response"][0]?.jobs || [];
      }

      console.log("JOB LIST:", jobList);

      // If API returns jobs, use them
      if (jobList.length > 0) {
        setJobs(jobList);

        localStorage.setItem(
          "jobs",
          JSON.stringify(jobList)
        );
      } else {
        // If API returns no jobs, use demo jobs
        setJobs(demoJobs);

        localStorage.setItem(
          "jobs",
          JSON.stringify(demoJobs)
        );
      }

    } catch (error) {
      console.error("Error fetching jobs:", error);
      console.error(
        "ERROR RESPONSE:",
        error.response?.data
      );

      // API failed, so use demo jobs
      setJobs(demoJobs);

      localStorage.setItem(
        "jobs",
        JSON.stringify(demoJobs)
      );

    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const companyName =
      job.companyName || job.company || "";

    const matchesSearch = 
      `${job.title || ""} ${companyName} ${job.location || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesCompany=
      !companyFilter ||
      (job.companyName || job.company || "")
        .toLowerCase()
        .includes(companyFilter.toLowerCase());

    return matchesSearch && matchesCompany;
  });

  return (
    <>
      <Navbar />

      <div className="jobs-container">

        <h1>Available Jobs</h1>

        <JobSearch
          search={search}
          setSearch={setSearch}
        />

        {loading ? (
          <h2>Loading...</h2>
        ) : filteredJobs.length === 0 ? (
          <h2>No Jobs Found</h2>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Jobs;