import React from "react";
import { Link } from "react-router-dom";
import FormComponent from "../FormComponent";

const PackageList = ({
  packages,
  filterTag,
  handleFilterChange,
  handleFilterSubmit,
}) => {
  return (
    <div>
      <h1>Packages List</h1>
      <h2>Filter with Tag</h2>
      <FormComponent
        placeholder="Search"
        name="filterTag"
        value={filterTag}
        handleChange={handleFilterChange}
        handleSubmit={handleFilterSubmit}
        buttonTag="Search"
      />
      <ul>
        {packages.map((pack) => (
          <li key={pack.id}>
            <Link to={`/package/${pack.packageName}`}>{pack.packageName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageList;
