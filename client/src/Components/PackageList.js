import React from "react";
import { Link } from "react-router-dom";

const PackageList = ({ packages }) => {
  return (
    <div>
      <h1>Packages List</h1>
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
