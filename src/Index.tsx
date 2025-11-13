"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import OpenSource from "@/components/OpenSource";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import LiquidEther from "@/components/ui/LiquidEther";

export default function Index() {
  return (
    <div className="relative overflow-hidden">

      {/* Liquid Ether Background */}
      <div className="fixed inset-0 -z-20">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Radial gradient on top */}
      <div className="fixed inset-0 bg-gradient-radial pointer-events-none -z-10" />

      {/* Page Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <OpenSource />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </div>
  );
}
