import { lazy, Suspense } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));

export default function App() {
  return (
    <TranslationProvider>
      {/* Fixed global background image */}
      <div className="fixed inset-0 w-screen h-screen -z-10 overflow-hidden">
        <img
          src="https://res.cloudinary.com/e2kvlfyf/video/upload/so_7/hero-substation_p2ok4v.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={<div className="min-h-[50vh] bg-void" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<div className="min-h-[50vh] bg-void" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="min-h-[50vh] bg-void" />}>
          <Experience />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </TranslationProvider>
  );
}
