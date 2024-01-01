import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  const { handle, name, numEmployees, logoUrl } = company;

  return (
    <div>
      <Link to={`/companies/${handle}`}>
        <h3>{name}</h3>
        <p>Employee Count: {numEmployees}</p>
        <img 
        src={logoUrl}
        alt={company.name}
        />
        </Link>
    </div>
  );
};

export default CompanyCard;