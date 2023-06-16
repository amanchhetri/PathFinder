import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={App} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
