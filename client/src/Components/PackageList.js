import React from "react";
import { Link } from "react-router-dom";

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
      <form onSubmit={handleFilterSubmit}>
        <input
          placeholder="Tag"
          name="filterTag"
          value={filterTag}
          onChange={handleFilterChange}
        />
        <button>Search</button>
      </form>
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
