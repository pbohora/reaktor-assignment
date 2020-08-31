import React from "react";
import { Link, useParams } from "react-router-dom";
import FormComponent from "../FormComponent";

import "./packageDetail.css";

const PackageDetail = ({
  packages,
  handleChange,
  inputState,
  handleSubmit,
}) => {
  const name = useParams().name;

  const singlePackage = packages.data.find(
    (pack) => pack.packageName === name.trim()
  );

  //server return the dependsOn as a string,so change it to array with
  //split on comma and pipe charecter "|".
  let dependsOn;
  if (singlePackage && singlePackage.dependsOn) {
    dependsOn = singlePackage.dependsOn
      .replace(/ *\([^)]*\) */g, "")
      .split(/[|,]+/);
  }

  //chack if the alternate dependency that maps to a package name and provide
  //the link to those dependency that maps package in the entry
  const dependencyList = (dependency) => {
    const mappedDependency = packages.data.find(
      (pack) => pack.packageName === dependency.trim()
    );
    if (mappedDependency) {
      return <Link to={`/package/${dependency}`}>{dependency}</Link>;
    } else {
      return dependency;
    }
  };

  return (
    <div>
      <h1>Package Detail</h1>
      {packages.isLoading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <h2>Name: {singlePackage.packageName}</h2>
          <p>Description: {singlePackage.description}</p>
          <h3>Depends On:</h3>
          <ul>
            {dependsOn &&
              dependsOn.map((dependency, index) => (
                <li key={index}>{dependencyList(dependency)}</li>
              ))}
          </ul>
          <h3> Reverse Dependency:</h3>
          <ul>
            {singlePackage.reverseDependency &&
              singlePackage.reverseDependency.map((depndency, index) => (
                <li key={index}>
                  <Link to={`/package/${depndency}`}>{depndency}</Link>
                </li>
              ))}
          </ul>
          <h3> Notes:</h3>
          <ul>
            {singlePackage.note &&
              singlePackage.note.map((singleNote, index) => (
                <li key={index}>{singleNote}</li>
              ))}
          </ul>
          <h3>Tags:</h3>
          <ul>
            {singlePackage.tags &&
              singlePackage.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
          </ul>
          <h3>Add Notes:</h3>
          <form
            className="textArea-container"
            onSubmit={(e) => handleSubmit(e, singlePackage.id)}
          >
            <textarea
              placeholder="Notes"
              rows="6"
              name="note"
              value={inputState.note}
              onChange={handleChange}
            />
            <button className="textArea-button">Add Note</button>
          </form>
          <h3>Add Tags:</h3>
          <FormComponent
            placeholder="Tag"
            name="tag"
            value={inputState.tag}
            handleChange={handleChange}
            handleSubmit={(e) => handleSubmit(e, singlePackage.id)}
            buttonTag="Add Tag"
          />
        </div>
      )}
    </div>
  );
};

export default PackageDetail;
