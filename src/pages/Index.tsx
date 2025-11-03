import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import OpenSource from "@/components/OpenSource";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Radial gradient background */}
      <div className="fixed inset-0 bg-gradient-radial pointer-events-none" />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <OpenSource />
        <Projects />
        <Contact />
      </div>
    </div>
  );
};

export default Index;
