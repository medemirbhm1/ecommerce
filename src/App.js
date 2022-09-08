import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Categorie from "./pages/Categorie";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    if (!JSON.parse(window.localStorage.getItem("likes"))) {
      window.localStorage.setItem("likes", "[]");
    }
  }, []);
  return (
    <div className="font-sans min-h-screen bg-softbackground">
      <div className="container mx-auto px-4">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<Categorie />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
