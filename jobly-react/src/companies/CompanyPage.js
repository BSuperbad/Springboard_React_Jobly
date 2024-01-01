import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api"
import { useParams } from "react-router-dom";
import JobsCardsList from "../jobs/JobCardsList";

const CompanyPage = ({apply}) => {
    const { handle} = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const getCompany = async ()=> {
            try {
                const companyData = await JoblyApi.getCompany(handle);
                setCompany(companyData);
                setLoading(false);
            } catch(e) {
                console.error(`Error fetching company with handle ${handle}:`, e);
            }
        };
        getCompany();
    }, [handle])

    if (loading) {
        return <div>Loading...</div>;
    }
    if(!company) {
        return <div>Company not found</div>;
    }
    
    return(
        <div>
            <h1>{company.name}</h1>
            <h3>{company.description}</h3>
            <img src={company.logoUrl} alt={company.name}/>
            <JobsCardsList companyHandle={handle} jobs={company.jobs} isCompanyPage={true} apply={apply}/>
        </div>
    )
};

export default CompanyPage;

