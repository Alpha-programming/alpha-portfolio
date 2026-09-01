import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/home/home";
import Projects from "./components/pages/projects/projects";
import ProjectDetail from "./components/pages/project_detail/project_detail";
import Certificates from "./components/pages/certificates/certificates";
import About from "./components/pages/about/about";
import Contact from "./components/pages/contact/contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;