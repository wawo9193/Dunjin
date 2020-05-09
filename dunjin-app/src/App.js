
import React from "react";
import "./App.css";
import Link from "./components/Link";
import Banner from "./components/Banner";

function App() {
  return (
    <div>
      <Banner />
      <div className="App">
        <h1>Dunjin</h1>
        <Link />
        <br/>
      </div>
    </div>
  );
}

export default App;