import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import JobCard from "./JobCard";
import Search from "../search/Search"

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await JoblyApi.request("jobs");
        setJobs(jobsData.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getJobs();
  }, []);

  const search = async (title) => {
    try {
      setIsLoading(true);
      let params = title ? { title } : {};
        const jobsData = await JoblyApi.request("jobs", params);
      setJobs(jobsData.jobs);
    } catch(e) {
      console.error("Error searching jobs: ", e)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div>
      <h2>List of Jobs</h2>
      <Search onSearch={search} />
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default JobsList;


