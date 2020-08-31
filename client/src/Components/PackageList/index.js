import React from "react";
import { Link } from "react-router-dom";
import FormComponent from "../FormComponent";

import "./packageList.css";

const PackageList = ({
  packages,
  filterTag,
  handleFilterChange,
  handleFilterSubmit,
  filteredPackages,
}) => {
  const listRender = (packages) => {
    return packages.map((pack) => (
      <li key={pack.id}>
        <Link to={`/package/${pack.packageName}`}>{pack.packageName}</Link>
      </li>
    ));
  };

  return (
    <div>
      <h1>Packages List</h1>
      {packages.isLoading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <h2>Filter with Tag</h2>
          <FormComponent
            placeholder="Search"
            name="filterTag"
            value={filterTag}
            handleChange={handleFilterChange}
            handleSubmit={handleFilterSubmit}
            buttonTag="Search"
          />
          <ul className="list-cotainer">
            {filteredPackages.length > 0
              ? listRender(filteredPackages)
              : listRender(packages.data)}
          </ul>
        </>
      )}
    </div>
  );
};

export default PackageList;
