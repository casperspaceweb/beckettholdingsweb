import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectForm from './components/ProjectForm';

function App() {
  const [showProjectForm, setShowProjectForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero onStartProject={() => setShowProjectForm(true)} />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
      {showProjectForm && (
        <ProjectForm onClose={() => setShowProjectForm(false)} />
      )}
    </div>
  );
}

export default App;