import React from "react";
import JobCard from "./JobCard";

const JobsCardsList = ({ jobs, isCompanyPage, applyForJob }) => {

  return (
      <div>
        {jobs.map(job => (
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
                isCompanyPage={isCompanyPage}
                applyForJob={applyForJob}
            />
        ))}
      </div>
  );
}

export default JobsCardsList;

