import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import Search from "../search/Search"

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const companiesData = await JoblyApi.request("companies");
        setCompanies(companiesData.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally{
        setIsLoading(false);
      }
    };

    getCompanies();
  }, []);

  const search = async (name) => {
    try {
      setIsLoading(true);
      const params = name ? {name} : {};
      const companiesData = await JoblyApi.request("companies", params);
      setCompanies(companiesData.companies);
    } catch(e) {
      console.error("Error searching companies: ", e)
    } finally {
      setIsLoading(false);
    }
  }

  if(!companies) {
    setIsLoading(true);
  }

  return (
    <div>
      <h2>List of Companies</h2>
      <Search onSearch={search}/>
      <div >
        {isLoading ? (
          <p>Loading...</p>
        ) : (companies.map((company) => (
            <CompanyCard key={company.handle} company={company} />
          ))
        )}
      </div>
    </div>
  );
};

export default CompaniesList;


