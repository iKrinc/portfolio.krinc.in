import React, { useState, useEffect, StrictMode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import './globalStyles.scss';

function App() {
  const [showNameInHeader, setShowNameInHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <AnimatePresence>
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ScrollToTop />
            <Header showNameInHeader={showNameInHeader} />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero setShowNameInHeader={setShowNameInHeader} />
                  <About />
                  <Projects />
                  <Skills />
                  <Contact />
                </>
              } />
              <Route path="/project/:projectId" element={<ProjectDetailPage />} />
            </Routes>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
