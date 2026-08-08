import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Colleges from "./pages/Colleges";
import Essays from "./pages/Essays";
import Deadlines from "./pages/Deadlines";
import Scholarships from "./pages/Scholarships";
import Navbar from "./components/Navbar";
import Layout from "./components/layouts/Layout";
import Achievements from "./pages/Achievements";
import Application from "./pages/Application";
import Testing from "./pages/Testing";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/essays" element={<Essays />} />
          <Route path="/deadlines" element={<Deadlines />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/application" element={<Application />} />
          <Route path="/testing" element={<Testing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;