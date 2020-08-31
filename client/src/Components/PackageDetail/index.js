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
          Add Tags:
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
