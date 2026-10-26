import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import api from "../../services/api";
import demoJobs from "../../data/demoJobs";

import "./Companies.css";

function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies();
  }, []);

  const createCompanies = (jobs) => {
    const companyMap = {};

    jobs.forEach((job) => {
      const companyName =
        job.companyName || job.company;

      if (!companyName) {
        return;
      }

      if (!companyMap[companyName]) {
        companyMap[companyName] = {
          id: companyName,
          name: companyName,
          location: job.location || "India",
          openings: 1,
        };
      } else {
        companyMap[companyName].openings += 1;
      }
    });

    return Object.values(companyMap);
  };

  const getCompanies = async () => {
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

      console.log("COMPANY API RESPONSE:", response.data);

      let jobs = [];

      if (Array.isArray(response.data)) {
        jobs = response.data;
      } else if (Array.isArray(response.data.jobs)) {
        jobs = response.data.jobs;
      } else if (
        response.data["data.aggregated_response"] &&
        Array.isArray(response.data["data.aggregated_response"])
      ) {
        jobs =
          response.data["data.aggregated_response"][0]?.jobs || [];
      }

      // If API returned jobs
      if (jobs.length > 0) {
        const companyList = createCompanies(jobs);
        setCompanies(companyList);
      } else {
        // Use demo jobs
        const companyList = createCompanies(demoJobs);
        setCompanies(companyList);
      }

    } catch (error) {
      console.error("Error fetching companies:", error);
      console.error(
        "ERROR RESPONSE:",
        error.response?.data
      );

      // API unavailable → use demo jobs
      const companyList = createCompanies(demoJobs);

      setCompanies(companyList);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="companies-page">

        <h1>Top Hiring Companies</h1>

        {loading ? (
          <h2>Loading companies...</h2>
        ) : companies.length === 0 ? (
          <h2>No companies found</h2>
        ) : (
          <div className="company-grid">

            {companies.map((company) => (
              <div
                className="company-card"
                key={company.id}
              >

                <h2>{company.name}</h2>

                <p>
                  📍 {company.location}
                </p>

                <p>
                  💼 {company.openings} Job
                  {company.openings !== 1 ? "s" : ""} Available
                </p>

                <button 
                  type="button"
                  onClick={()=>{
                    navigate("/jobs", {
                      state: {
                        company: company.name,
                      },
                    });
                  }}
                >
                  View Jobs
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Companies;