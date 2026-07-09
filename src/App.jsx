import React from 'react';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-[#030712] overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Animated Background */}
      <div className="relative w-full">
        <AnimatedBackground />
        <Hero />
      </div>

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
