import React, { useState, useEffect } from "react";
import { getPackages, getSinglePackage, updataPackage } from "./services";
import { Switch, Route, Link } from "react-router-dom";

import PackageDetail from "./Components/PackageDetail";
import PackageList from "./Components/PackageList";
import "./App.css";

function App() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages().then((data) => setPackages(data));
  }, []);
  console.log(packages);
  return (
    <Switch>
      <Route exact path="/">
        <PackageList packages={packages} />
      </Route>
      <Route path="/package/:name">
        <PackageDetail packages={packages} />
      </Route>
    </Switch>
  );
}

export default App;
