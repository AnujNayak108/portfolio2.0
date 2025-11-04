import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for skill badges
      gsap.set(".skill-badge", { scale: 1, opacity: 1 });

      gsap.from(".skills-title", {
        scrollTrigger: {
          trigger: ".skills-title",
          start: "top 80%",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".skill-badge", {
        scrollTrigger: {
          trigger: ".skill-badge",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
      });

      // Floating animation for skill badges
      gsap.to(".skill-badge", {
        y: -8,
        duration: 2,
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true,
        },
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: "Web Development",
      skills: ["React", "Next.js", "JavaScript" ,"TypeScript", "Tailwind CSS", "Node.js", "Express.js" , "MongoDB", "Firebase" , "GraphQL"]
    },
    {
      title: "Data Science",
      skills: ["Python", "Numpy" , "Pandas", "Scikit-Learn", "MatplotLib"]
    },
    {
      title: "Dev Tools & Languages",
      skills: ["Git", "GitHub" , "Docker", "Figma", "VS Code", "SQL" , "C++" , "C" , "Java"]
    }
  ];

  const skillLogos = {
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Numpy": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  "Scikit-Learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  "MatplotLib": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "AWS": "/logos/aws.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
};

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="skills-title text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="gradient-text">Skills</span> & Expertise
        </h2>

        <div className="max-w-6xl mx-auto space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-center text-primary">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 [perspective:1000px]">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-badge glass-card px-6 py-4 rounded-xl cursor-pointer group relative [transform-style:preserve-3d] shadow-[0_10px_30px_rgba(0,0,0,0.3),0_0_20px_rgba(66,133,244,0.1)] transition-all duration-300 ease-out"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "rotateX(10deg) rotateY(10deg) translateZ(20px)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(66, 133, 244, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(66, 133, 244, 0.1)";
                    }}
                  >
                    <div className="text-center relative [transform:translateZ(10px)] flex flex-col items-center gap-2">
                      <img
                        src={skillLogos[skill]}
                        alt={skill}
                        className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <p className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        {skill}
                      </p>
                    </div>
                    {/* 3D depth layer */}
                    <div 
                      className="absolute inset-0 bg-primary/5 rounded-xl -z-10 [transform:translateZ(-10px)]" 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
