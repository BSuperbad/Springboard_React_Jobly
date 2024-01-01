import React, { useState } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api/api";

const JobCard = ({ job, id, title, salary, companyName, companyHandle, isCompanyPage}) => {
  const jobInfo = job || { id, title, salary, companyName, companyHandle };
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    try {
      await JoblyApi.applyForJob(jobInfo.id); // Assuming jobInfo.id is the job ID
      setApplied(true);
    } catch (error) {
      console.error('Error applying for the job:', error);
    }
  };

  return (
    <div className="job-card">
      <h3>{jobInfo.title}</h3>
      <p>Salary: {jobInfo.salary}</p>
      
      {!isCompanyPage ? (
        <>
        <Link to={`/companies/${jobInfo.companyHandle}`}>
          <p>Company: {jobInfo.companyName}</p>
        </Link>
        {applied ? (
            <button disabled>Applied</button>
          ) : (
            <button onClick={handleApply}>Apply</button>
          )}
        </>
      ) : null}
    </div>
  );
};

export default JobCard;
