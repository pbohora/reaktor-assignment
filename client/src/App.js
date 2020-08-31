import React, { useState, useEffect } from "react";
import { getPackages, updatePackage } from "./services";
import { Switch, Route } from "react-router-dom";

import PackageDetail from "./Components/PackageDetail";
import PackageList from "./Components/PackageList";

const App = () => {
  const [packages, setPackages] = useState({ isLoading: true, data: [] });
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [inputState, setInputState] = useState({ note: "", tag: "" });
  const [filterTag, setFilterTag] = useState("");

  //query all packages from server on first load of the page then sort the packages
  // and update the package state
  useEffect(() => {
    getPackages().then((data) => {
      const sortedPackages = sortData(data);
      setPackages({ isLoading: false, data: sortedPackages });
    });
  }, []);

  //handle input change for notes and tags
  const handleChange = (e) => {
    const value = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: value,
    });
  };

  //handle submit for notes and tags
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const newObj = {
      noteBody: inputState.note,
      tagBody: inputState.tag.toLocaleLowerCase(),
    };
    const updatedPackage = await updatePackage(id, newObj); //save added noted and tags to the database
    setPackages({
      isLoading: false,
      data: packages.data.map((p) => (p.id !== id ? p : updatedPackage)),
    }); //update the package state
    setInputState({ note: "", tag: "" });
  };

  //handle change for filter input
  const handleFilterChange = (e) => {
    setFilterTag(e.target.value);
  };

  //
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFilteredPackages(
      packages.data.filter(
        (p) =>
          filterTag === "" || p.tags.includes(filterTag.toLowerCase().trim())
      )
    );
  };

  //sort the packages alphabetically
  const sortData = (data) => {
    const sortedData = data.sort((a, b) => {
      if (a.packageName < b.packageName) return -1;
      if (a.packageName > b.packageName) return 1;
      return 0;
    });
    return sortedData;
  };

  return (
    <Switch>
      <Route exact path="/">
        <PackageList
          packages={packages}
          handleFilterChange={handleFilterChange}
          handleFilterSubmit={handleFilterSubmit}
          filterTag={filterTag}
          filteredPackages={filteredPackages}
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
