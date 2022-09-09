import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Categorie from "./pages/Categorie";
import Home from "./pages/Home";
import Likes from "./pages/Likes";

function App() {
  useEffect(() => {
    if (!JSON.parse(window.localStorage.getItem("likes"))) {
      window.localStorage.setItem("likes", "[]");
    }
    if (!JSON.parse(window.localStorage.getItem("cart"))) {
      window.localStorage.setItem("cart", "[]");
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
            <Route path="/likes" element={<Likes />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
