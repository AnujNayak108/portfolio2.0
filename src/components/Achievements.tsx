import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".achievement-title", {
        scrollTrigger: {
          trigger: ".achievement-title",
          start: "top 80%",
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
      });

      // Animate achievement cards with stagger
      gsap.from(".achievement-card", {
        scrollTrigger: {
          trigger: ".achievement-card",
          start: "top 85%",
          once: true,
        },
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotation: -5,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        immediateRender: false,
      });

      // Number counter animation
      const counters = document.querySelectorAll<HTMLElement>(".achievement-number");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);
        const suffix = counter.getAttribute("data-suffix") || "";

        if (isNaN(target)) {
          counter.textContent = suffix ? `0${suffix}` : "0";
          return;
        }

        const obj = { val: 0 };
        gsap.to(obj, {
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
          },
          val: target,
          duration: 2,
          ease: "power1.out",
          onUpdate: () => {
            counter.textContent = Math.round(obj.val).toString() + suffix;
          },
        });
      });

      // Continuous floating animation for cards
      gsap.to(".achievement-card", {
        y: -15,
        duration: 2,
        ease: "power1.inOut",
        stagger: {
          each: 0.3,
          repeat: -1,
          yoyo: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    {
      number: 10,
      suffix: "+",
      title: "Projects Completed",
      description: "Delivered successful projects across web and data analytics",
    },
    {
      number: 15,
      suffix: "+",
      title: "Technologies Mastered",
      description: "Expertise across frontend, backend, and data tools",
    },
  ];

  const codingProfiles = [
    {
      platform: "Codeforces",
      rating: "1049",
      rank: "Newbie",
      color: "text-primary",
      link: "https://codeforces.com/profile/Binaryspot",
    },
    {
      platform: "LeetCode",
      rating: "169+",
      rank: "Questions solved",
      color: "text-accent",
      link: "https://leetcode.com/u/PD2WursKvf/",
    },
  ];

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="achievement-title text-4xl md:text-6xl font-bold text-center mb-16">
          Achievements & <span className="gradient-text">Milestones</span>
        </h2>

        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-8 max-w-7xl mx-auto [perspective:1500px]">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card glass-card p-8 rounded-2xl text-center relative group overflow-hidden [transform-style:preserve-3d] shadow-[0_15px_40px_rgba(0,0,0,0.4),0_0_25px_rgba(66,133,244,0.15)] transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotateX(8deg) rotateY(-8deg) translateZ(30px)";
                e.currentTarget.style.boxShadow = "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(66, 133, 244, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(66, 133, 244, 0.15)";
              }}
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 [transform:translateZ(20px)]">
                <div className="mb-4">
                  <span
                    className="achievement-number text-5xl md:text-6xl font-bold gradient-text block"
                    data-target={achievement.number}
                    data-suffix={achievement.suffix}
                  >
                    0{achievement.suffix}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  {achievement.title}
                </h3>
                
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>

              {/* 3D depth layers */}
              <div 
                className="absolute inset-0 bg-card/30 rounded-2xl -z-10 border border-border/30 [transform:translateZ(-15px)]" 
              />
              <div 
                className="absolute inset-0 bg-card/20 rounded-2xl -z-20 border border-border/20 [transform:translateZ(-30px)]" 
              />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Competitive Programming Profiles */}
        <div className="mt-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Competitive <span className="gradient-text">Programming</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto [perspective:1500px]">
            {codingProfiles.map((profile, index) => (
              <a
                key={index}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="achievement-card glass-card p-10 rounded-2xl text-center relative group overflow-hidden block [transform-style:preserve-3d] shadow-[0_15px_40px_rgba(0,0,0,0.4),0_0_25px_rgba(66,133,244,0.15)] transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotateX(-8deg) rotateY(8deg) translateZ(30px) scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(66, 133, 244, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(66, 133, 244, 0.15)";
                }}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 [transform:translateZ(20px)]">
                  <h4 className="text-3xl font-bold mb-4 text-foreground">{profile.platform}</h4>
                  
                  <div className="mb-4">
                    <span className={`text-5xl font-bold block ${profile.color}`}>
                      {profile.rating}
                    </span>
                  </div>
                  
                  <p className="text-xl text-muted-foreground">
                    <span className="font-semibold">{profile.rank}</span>
                  </p>
                </div>

                {/* 3D depth layers */}
                <div 
                  className="absolute inset-0 bg-card/30 rounded-2xl -z-10 border border-border/30 [transform:translateZ(-15px)]" 
                />
                <div 
                  className="absolute inset-0 bg-card/20 rounded-2xl -z-20 border border-border/20 [transform:translateZ(-30px)]" 
                />

                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
