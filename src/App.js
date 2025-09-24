import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeContex";
import ChatWidget from "./components/ChatWidget";

// Lazy load components for better performance
const Home = lazy(() => import("./components/home"));
const JobList = lazy(() => import("./components/JobList"));
const JobDetails = lazy(() => import("./components/JobDetails"));
const Intership = lazy(() => import("./components/internship"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/terms"));
const ResumeChecker = lazy(() => import("./components/resumeChecker"));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />

        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              {/* Suspense fallback shows while lazy-loaded components load */}
              <Suspense fallback={<div style={{padding: "2rem", textAlign:"center"}}>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<JobList />} />
                  <Route path="/job/:id" element={<JobDetails />} />
                  <Route path="/internships" element={<Intership />} />
                  <Route path="/locations" element={<h2>Locations Coming Soon</h2>} />

                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />

                  <Route path="/resume-checker" element={<ResumeChecker />} />
                </Routes>
              </Suspense>
            </div>

            <div className="col-lg-4 d-none d-lg-block">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* <AdBanner /> */}
        <Footer />

        {/* Floating Chat Widget */}
        <ChatWidget />
      </Router>
    </ThemeProvider>
  );
}

export default App;
