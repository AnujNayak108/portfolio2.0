import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      });

      gsap.from(".social-links", {
        scrollTrigger: {
          trigger: ".social-links",
          start: "top 85%",
        },
        y: 30,
        duration: 0.6,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      formRef.current?.reset();
    }, 1000);
  };

  const socialLinks = [
    { Icon: Mail, label: "Email", href: "mailto:your.anujnayak108@gmail.com" },
    { Icon: Github, label: "GitHub", href: "https://github.com/AnujNayak108" },
    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anuj-nayak-189a83233/" },
    { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="contact-title text-4xl md:text-5xl font-bold text-center mb-4">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>

        <div className="max-w-2xl mx-auto">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form glass-card p-8 rounded-2xl space-y-6 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-background/50"
                />
              </div>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Subject"
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                required
                className="bg-background/50 min-h-[150px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          <div className="flex justify-center gap-6">
            {socialLinks.map((link, index) => {
              const IconComponent = link.Icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-links glass-card p-4 rounded-xl hover:shadow-glow transition-all duration-300 group"
                  aria-label={link.label}
                >
                  <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="mt-24 text-center text-muted-foreground">
        <p>&copy; Built by Anuj Nayak.</p>
      </footer>
    </section>
  );
};

export default Contact;
