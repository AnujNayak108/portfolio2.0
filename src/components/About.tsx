import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Database, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-description", {
        scrollTrigger: {
          trigger: ".about-description",
          start: "top 80%",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 20%",
            scrub: 1,
          },
          x: direction,
          opacity: 0,
          rotation: direction > 0 ? 5 : -5,
          scale: 0.8,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const features = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Building responsive, performant web applications with modern frameworks and best practices.",
    },
    {
      icon: Database,
      title: "Data Analysis",
      description: "Transforming complex datasets into meaningful insights through visualization and analysis.",
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Combining technical expertise with creative thinking to deliver innovative solutions.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="about-title text-4xl md:text-5xl font-bold text-center mb-16">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="max-w-3xl mx-auto mb-20 text-center">
          <p className="about-description text-lg md:text-xl text-muted-foreground leading-relaxed">
            I'm a passionate developer who bridges the gap between creative design and data-driven decisions. 
            With expertise in modern web technologies and data analytics, I create solutions that are both 
            beautiful and intelligent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="glass-card p-8 rounded-2xl hover:shadow-glow transition-all duration-300 group"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
