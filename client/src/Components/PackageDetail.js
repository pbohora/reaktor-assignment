import React, { useState, useEffect } from "react";
//import { getPackages, getSinglePackage, updataPackage } from "./services";
import { Link, useParams } from "react-router-dom";

const PackageDetail = ({ packages }) => {
  const name = useParams().name;

  const singlePackage = packages.find(
    (pack) => pack.packageName === name.trim()
  );
  let dependsOn;
  if (singlePackage && singlePackage.dependsOn) {
    dependsOn = singlePackage.dependsOn
      .replace(/ *\([^)]*\) */g, "")
      .split(",");
  }
  console.log(singlePackage);
  console.log(dependsOn);
  return (
    <div>
      <h1>Packages Detail</h1>
      {singlePackage && (
        <div>
          <h2>Name: {singlePackage.packageName}</h2>
          <p>Description: {singlePackage.description}</p>
          Depends On:
          <ul>
            {dependsOn &&
              dependsOn.map((depndency, index) => (
                <li key={index}>
                  <Link to={`/package/${depndency}`}>{depndency}</Link>
                </li>
              ))}
          </ul>
          Reverse Dependency:
          <ul>
            {singlePackage.reverseDependency &&
              singlePackage.reverseDependency.map((depndency, index) => (
                <li key={index}>
                  <Link to={`/package/${depndency}`}>{depndency}</Link>
                </li>
              ))}
          </ul>
          Notes:
          <ul>
            {singlePackage.note &&
              singlePackage.note.map((singleNote, index) => (
                <li key={index}>{singleNote}</li>
              ))}
          </ul>
          Tags:
          <ul>
            {singlePackage.tags &&
              singlePackage.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
          </ul>
          Add Notes:
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Notes"
              rows="10"
              cols="100"
              onChange={handleInputChange}
            />
            <button>Add Note</button>
          </form>
          Add Tags:
          <form onSubmit={handleSubmit}>
            <input placeholder="Tag" onChange={handleInputChange} />
            <button>Add Tag</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PackageDetail;
