import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Awards from './sections/Awards';
import Achievements from './sections/Achievements';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <SmoothScroll>
      <div className="app-container">
        {/* Subtle cinematic grain texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Ambient atmospheric background glows */}
        <div className="ambient-glow ambient-glow-2" aria-hidden="true" />

        {/* Custom interactive cursor */}
        <CustomCursor />

        {/* Top scroll progress indicator */}
        <ScrollProgress />

        {/* Floating navigation header */}
        <Navbar />

        {/* Main Content Sections */}
        <main id="main-content">
          <Hero />
          <MarqueeTicker />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Awards />
          <Achievements />
          <Certifications />
          <Education />
          <Contact />
        </main>

        {/* Editorial Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
