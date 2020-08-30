import React, { useState, useEffect } from "react";
import { getPackages, getSinglePackage, updatePackage } from "./services";
import { Switch, Route, Link } from "react-router-dom";

import PackageDetail from "./Components/PackageDetail";
import PackageList from "./Components/PackageList";
import "./App.css";

const App = () => {
  const [packages, setPackages] = useState([]);
  const [inputState, setInputState] = useState({ note: "", tag: "" });
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    getPackages().then((data) => setPackages(data));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const newObj = {
      noteBody: inputState.note,
      tagBody: inputState.tag.toLocaleLowerCase(),
    };
    const updatedPackage = await updatePackage(id, newObj);
    setPackages(packages.map((p) => (p.id !== id ? p : updatedPackage)));
  };

  const handleFilterChange = (e) => {
    setFilterTag(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPackages(
      packages.filter(
        (p) =>
          filterTag === "" || p.tags.includes(filterTag.toLowerCase().trim())
      )
    );
  };
  packages.sort((a, b) => {
    if (a.packageName < b.packageName) return -1;
    if (a.packageName > b.packageName) return 1;
    return 0;
  });
  console.log(packages);

  return (
    <Switch>
      <Route exact path="/">
        <PackageList
          packages={packages}
          handleFilterChange={handleFilterChange}
          handleFilterSubmit={handleFilterSubmit}
          filterTag={filterTag}
        />
      </Route>
      <Route path="/package/:name">
        <PackageDetail
          packages={packages}
          handleChange={handleChange}
          inputState={inputState}
          handleSubmit={handleSubmit}
        />
      </Route>
    </Switch>
  );
};

export default App;
