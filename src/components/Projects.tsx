import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 80%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      projectsRef.current.forEach((project, index) => {
        const direction = index % 2 === 0 ? -120 : 120;
        gsap.from(project, {
          scrollTrigger: {
            trigger: project,
            start: "top 90%",
            end: "top 30%",
            scrub: 1.5,
          },
          x: direction,
          opacity: 0,
          scale: 0.85,
          rotation: direction > 0 ? 8 : -8,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  const projects = [
    {
      title: "EDC-BITM",
      description: "Official website for the Entrepreneurship Development Cell of BIT Mesra, featuring event management and startup resources.",
      tags: ["React", "Node.js", "Javascript", "TailwindCSS"],
      image: "./edcbitm.png",
      githubUrl: "https://github.com/EDC-BITM/EDC-BITM.git",
      liveUrl: "https://edcbitmesra.in/",
      gradient: "from-primary/20 to-secondary/20",
    },
    {
      title: "Esummit25",
      description: "Website for E-Summit 2025 of BIT Mesra, showcasing event details, speakers, and registration features.",
      tags: ["React", "Node.js", "Javascript", "TailwindCSS"],
      image: "./esummit.gif",
      githubUrl: "https://github.com/EDC-BITM/E-Summit-2025.git",
      liveUrl: "https://esummit.edcbitmesra.in/",
      gradient: "from-secondary/20 to-primary/20",
    },
    {
      title: "AI-Powered Chat Application",
      description: "customer support platform leveraging OpenAI for intelligent responses support and realtime customer interaction using websockets.",
      tags: ["Next.js", "MongoDB" , "WebSocket", "OpenAI", "TailwindCSS" , "Node.js" , "Express" , "typeScript"],
      image: "eazzcustomer.png",
      githubUrl: "https://github.com/AnujNayak108/customer-support-platform.git",
      liveUrl: "https://customer-support-platform-five.vercel.app/",
      gradient: "from-primary/20 via-accent/20 to-secondary/20",
    },
    {
      title: "Music-room Slot Booking System",
      description: "A web application for booking music practice slots, featuring user authentication, slot management, and real-time availability updates.",
      tags: ["Next.js", "Firebase", "Typescript", "TailwindCSS" , "Node.js" , "prisma"],
      image: "slotbooking.png",
      githubUrl: "https://github.com/AnujNayak108/DHWANI-SLOT-BOOKING.git",
      liveUrl: "https://dhwani-slot-booking.vercel.app/",
      gradient: "from-secondary/20 to-accent/20",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <h2 className="projects-title text-4xl md:text-5xl font-bold text-center mb-16">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="glass-card rounded-2xl overflow-hidden group hover:shadow-glow transition-all duration-300"
            >
              <div className="h-64 relative overflow-hidden">
                {/* Project Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40`} />
                
                {/* Hover Overlay with Buttons */}
                <div className="absolute inset-0 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-background/80 backdrop-blur-sm"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
