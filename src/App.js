import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./component/test.js";
import Home from "./component/home.js";
import Read from "./component/read.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/home" element={<Home />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
