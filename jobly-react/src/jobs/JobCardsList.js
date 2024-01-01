import React from "react";
import JobCard from "./JobCard";

const JobsCardsList = ({ jobs, isCompanyPage }) => {

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
            />
        ))}
      </div>
  );
}

export default JobsCardsList;

