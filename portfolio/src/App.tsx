import { useState, useEffect, useRef } from "react";
import ExpandableCard from "./components/ExpandableCard";
import ExperienceCard from "./components/ExperienceCard";
import EducationCard from "./components/EducationCard";
import { webProjects, gameProjects, motionProjects } from "./data/projects";

const SectionSeparator = () => (
  <div className="relative w-full bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="w-full h-px bg-linear-to-r from-transparent via-indigo-400 to-transparent opacity-60" />
    </div>
  </div>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const orbRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const foregroundImageRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const webCardRef = useRef<HTMLDivElement>(null);
  const gameCardRef = useRef<HTMLDivElement>(null);
  const motionCardRef = useRef<HTMLDivElement>(null);

  const particles = [
    { left: "15%", top: "25%", delay: "0.5s", duration: "4s" },
    { left: "45%", top: "15%", delay: "1.2s", duration: "5s" },
    { left: "75%", top: "35%", delay: "0.8s", duration: "6s" },
    { left: "25%", top: "65%", delay: "1.5s", duration: "3.5s" },
    { left: "55%", top: "80%", delay: "0.3s", duration: "5.5s" },
    { left: "85%", top: "55%", delay: "2.0s", duration: "4.5s" },
    { left: "10%", top: "90%", delay: "1.8s", duration: "5s" },
    { left: "35%", top: "45%", delay: "0.2s", duration: "6.5s" },
    { left: "65%", top: "70%", delay: "1.0s", duration: "4s" },
    { left: "95%", top: "10%", delay: "2.2s", duration: "5s" },
    { left: "20%", top: "40%", delay: "0.7s", duration: "5.5s" },
    { left: "70%", top: "20%", delay: "1.3s", duration: "4.5s" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (orbRef.current && backgroundImageRef.current && foregroundImageRef.current) {
        const { x, y } = mousePosRef.current;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (x - centerX) * 0.02;
        const moveY = (y - centerY) * 0.02;
        
        orbRef.current.style.transform = `translate(calc(-50% + ${moveX * 2}px), calc(-50% + ${moveY * 2}px))`;
        backgroundImageRef.current.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        foregroundImageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href && href !== "#") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (
    category: "web" | "game" | "motion",
    e: React.MouseEvent,
  ) => {
    e.preventDefault();

    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        let targetCard: HTMLDivElement | null = null;

        if (category === "web" && webCardRef.current) {
          targetCard = webCardRef.current;
        } else if (category === "game" && gameCardRef.current) {
          targetCard = gameCardRef.current;
        } else if (category === "motion" && motionCardRef.current) {
          targetCard = motionCardRef.current;
        }

        if (targetCard) {
          const clickableHeader = targetCard.querySelector(".cursor-pointer");
          if (clickableHeader) {
            (clickableHeader as HTMLElement).click();
          }

          setTimeout(() => {
            targetCard?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-xl shadow-lg" : "bg-slate-900/80 backdrop-blur-sm"}`}
      >
        <nav className="w-full px-8 md:px-12 py-5 flex items-center justify-between border-b border-white/5 transition-all duration-300">
          <div className="flex items-center gap-12">
            {[
              ["Skills", "skills"],
              ["Work", "experience"],
              ["Education", "education"],
              ["Contact", "contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={handleNavClick}
                className="relative text-base font-semibold tracking-wide text-slate-300 hover:text-white transition-all duration-300 group px-1 hidden md:block"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </div>

          <div className="group relative">
            <a
              href="#top"
              onClick={handleNavClick}
              className="relative block font-extrabold text-2xl tracking-tight bg-linear-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105"
            >
              Marko Bakula
            </a>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-indigo-400 to-indigo-600 transition-all duration-300 group-hover:w-full rounded-full" />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-12 h-12 rounded-xl border border-white/10 bg-slate-800/50 hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 mt-1.5 ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 mt-1.5 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </nav>

        <div
          className={`
          md:hidden
          absolute top-18.25 left-0 w-full
          bg-slate-900/95 backdrop-blur-xl
          border-b border-white/5
          shadow-2xl
          transition-all duration-300
          ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
        `}
        >
          <div className="px-8 py-8 space-y-5">
            {[
              ["Skills", "skills"],
              ["Work", "experience"],
              ["Education", "education"],
              ["Contact", "contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={handleNavClick}
                className="block text-xl font-semibold text-slate-300 hover:text-white transition-colors duration-300 py-2"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="h-18.25" />

      {/* Hero Section */}
      <section
        id="top"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-float"
            style={{ left: "5%", top: "15%" }}
          />
          <div
            className="absolute w-80 h-80 bg-emerald-600/30 rounded-full blur-3xl animate-float-delayed"
            style={{ right: "15%", top: "30%" }}
          />
          <div
            className="absolute w-72 h-72 bg-amber-600/30 rounded-full blur-3xl animate-pulse-slow"
            style={{ left: "25%", bottom: "20%" }}
          />
          <div 
            ref={orbRef}
            className="absolute w-150 h-150 bg-indigo-500/15 rounded-full blur-3xl transition-transform duration-100 ease-out will-change-transform hidden md:block"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-size-[80px_80px] animate-pulse-slow" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse hidden md:block"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div className="relative w-full">
          <div className="relative w-full min-h-screen flex items-center">
            <div className="absolute inset-0 flex justify-end items-center">
              <div 
                ref={backgroundImageRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 h-auto mr-10 hidden lg:block will-change-transform"
                style={{ 
                  zIndex: 1,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src="./MyPhotoBackground.png"
                  alt="Marko Bakula Background"
                  className="w-full h-auto object-contain rounded-2xl"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                  }}
                />
              </div>

              <div 
                ref={foregroundImageRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 mr-10 hidden lg:block will-change-transform"
                style={{
                  width: "calc(60% * 1.03)",
                  zIndex: 2,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src="./MyPhoto.png"
                  alt="Marko Bakula"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"> 
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-2xl mx-auto lg:mx-0 animate-fade-in-up">
                  <div className="overflow-hidden">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl 2xl:text-8xl 3xl:text-9xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 animate-slide-up leading-tight">
                      Marko{" "}
                      <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                        Bakula
                      </span>
                    </h1>
                  </div>

                  <div className="overflow-hidden w-full">
                    <p className="text-slate-200 leading-relaxed text-lg sm:text-xl md:text-2xl lg:text-xl 2xl:text-2xl 3xl:text-3xl max-w-2xl mx-auto lg:mx-0 animate-slide-up delay-200 px-2 sm:px-4 lg:px-0">
                      I craft interactive experiences across{" "}
                      <button
                        onClick={(e) => handleCategoryClick("web", e)}
                        className="relative font-bold text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 focus:outline-none px-0.5 py-0.5 inline-block group text-lg sm:text-xl md:text-2xl lg:text-xl 2xl:text-2xl 3xl:text-3xl"
                      >
                        <span className="relative z-10">web development</span>
                        <span
                          className="absolute inset-0 bg-blue-400/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg pointer-events-none"
                          style={{ filter: "blur(4px)" }}
                        />
                        <span
                          className="absolute inset-0 bg-blue-400/5 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-lg pointer-events-none"
                          style={{ filter: "blur(8px)" }}
                        />
                      </button>
                      ,{" "}
                      <button
                        onClick={(e) => handleCategoryClick("game", e)}
                        className="relative font-bold text-emerald-400 hover:text-emerald-300 transition-all duration-300 hover:scale-105 focus:outline-none px-0.5 py-0.5 inline-block group text-lg sm:text-xl md:text-2xl lg:text-xl 2xl:text-2xl 3xl:text-3xl"
                      >
                        <span className="relative z-10">game development</span>
                        <span
                          className="absolute inset-0 bg-emerald-400/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg pointer-events-none"
                          style={{ filter: "blur(4px)" }}
                        />
                        <span
                          className="absolute inset-0 bg-emerald-400/5 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-lg pointer-events-none"
                          style={{ filter: "blur(8px)" }}
                        />
                      </button>
                      , and{" "}
                      <button
                        onClick={(e) => handleCategoryClick("motion", e)}
                        className="relative font-bold text-amber-400 hover:text-amber-300 transition-all duration-300 hover:scale-105 focus:outline-none px-0.5 py-0.5 inline-block group text-lg sm:text-xl md:text-2xl lg:text-xl 2xl:text-2xl 3xl:text-3xl"
                      >
                        <span className="relative z-10">video editing</span>
                        <span
                          className="absolute inset-0 bg-amber-400/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg pointer-events-none"
                          style={{ filter: "blur(4px)" }}
                        />
                        <span
                          className="absolute inset-0 bg-amber-400/5 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-lg pointer-events-none"
                          style={{ filter: "blur(8px)" }}
                        />
                      </button>
                      , always looking to improve and learn along the way while
                      having fun.
                    </p>
                  </div>

                  <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in delay-500">
                    <a
                      href="#skills"
                      onClick={handleNavClick}
                      className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg lg:text-base 2xl:text-xl 3xl:text-2xl bg-indigo-600 shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:bg-indigo-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.9)] transition-all hover:scale-105"
                    >
                      See my work
                    </a>
                    <a
                      href="#contact"
                      onClick={handleNavClick}
                      className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg lg:text-base 2xl:text-xl 3xl:text-2xl border border-white/30 text-white hover:border-indigo-400 hover:text-indigo-300 transition-all hover:scale-105"
                    >
                      Contact Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* Skills Section */}
      <section id="skills" className="relative pt-24 pb-28 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex justify-center mb-6">
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-150" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-300" />
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold tracking-tight mb-6">
              <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Skills
              </span>
              <span className="text-white mx-3">&</span>
              <span className="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <p className="text-slate-300 text-xl lg:text-xl 2xl:text-2xl 3xl:text-3xl leading-relaxed font-light max-w-2xl mx-auto">
              I always had interest in a broad span of fields but with
              programming as a base I learn and polish these three core skills
              that I consider my best.
            </p>

            <div className="w-24 h-1 bg-linear-to-r from-blue-400 via-emerald-400 to-amber-400 rounded-full mx-auto mt-8" />
          </div>

          <div className="space-y-16">
            <div ref={webCardRef}>
              <ExpandableCard
                category="web"
                title="Web Development ⚡"
                subtitle="React · TypeScript · TailWind · HTML · CSS · Javascript · Blazor"
                icons={[
                  "./icons/web-react.png",
                  "./icons/typescript.png",
                  "./icons/tailwind.png",
                ]}
                description="I build web apps that feel smooth and responsive, whether it's a personal site or a full-blown platform. With a higher focus on frontend but I do pride myself in writing clean (somewhat) and maintainable code."
                projects={webProjects}
              />
            </div>

            <div ref={gameCardRef}>
              <ExpandableCard
                category="game"
                title="Game Development 🎮"
                subtitle="Unity · C# · Object Oriented · Game Jams"
                icons={[
                  "./icons/unity.png",
                  "./icons/csharp.png",
                  "./icons/shader.png",
                ]}
                description="My on and off hobby and job for the past few years. Focusing mostly on Unity projects that are built during time sensitive game jams but also ones I'm most proud of."
                projects={gameProjects}
              />
            </div>

            <div ref={motionCardRef}>
              <ExpandableCard
                category="motion"
                title="Motion & Video 🎬"
                subtitle="After Effects · Motion Design"
                icons={[
                  "./icons/aftereffects.png",
                  "./icons/premiere.png",
                  "./icons/illustrator.png",
                ]}
                description="While it started out as a necessity for a job, I realized how useful and fulfilling making videos is. Promos, logos, and visual storytelling are all things I'm capable of doing now."
                projects={motionProjects}
              />
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* Experience Section */}
      <section
        id="experience"
        className="relative min-h-screen flex items-center bg-slate-900"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 w-full py-32">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div className="md:sticky md:top-32">
              <h2 className="text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold tracking-tight">
                Work
              </h2>
              <p className="mt-6 text-slate-300 text-lg lg:text-lg 2xl:text-xl 3xl:text-2xl leading-relaxed max-w-md">
                A blend of frontend engineering, game dev and video making.
                Internships taught me how to work with teams and work on
                frontend, while my main job gave me the experience to function
                and work in a real competitive environment.
              </p>
              <div className="mt-10 h-1 w-24 rounded-full bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
            </div>

            <div className="space-y-10">
              <ExperienceCard
                role="Operation Engineer / Unity Developer"
                company="Replai"
                logo="./logos/replai.png"
                period="2025-2026"
                description="Developed Unity systems and gameplay features for interactive mobile game ads you've probably seen before downloading some of the biggest games on the App Store. The job was all about rapid prototyping and iteration, build eye-catching and fun, test it, check the metrics and make it even better. Also handled video editing in After Effects to polish the result."
              />

              <ExperienceCard
                role="Frontend Developer Intern"
                company="ERP Sirmium"
                logo="./logos/erp-sirmium.png"
                period="2023"
                description="Worked on UI improvements and backend integration. Learned a lot about clean code, team collaboration, and how real-world products come together."
              />
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* Education Section */}
      <section id="education" className="relative w-full py-28 bg-slate-900">
        <div className="absolute inset-0 w-full bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_2px,transparent_2px,transparent_8px)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.6fr_1fr] gap-20 items-start">
            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-30 bottom-0 -translate-x-1/2">
                <div className="absolute inset-0 w-0.5 bg-indigo-500/60" />
                <div className="absolute inset-0 w-1.5 bg-indigo-500/30 blur-xl" />
              </div>

              <div className="space-y-16 relative z-10">
                <EducationCard
                  title="Master's"
                  school="VIŠER / ATUSS - Belgrade"
                  logo="./logos/viser.png"
                  period="2025 – Present"
                  big
                  current
                  align="left"
                />

                <EducationCard
                  title="Bachelor's"
                  school="VŠSS Srimijum - Sremska Mitrovica"
                  logo="./logos/sirmium-college.png"
                  period="2021 – 2024"
                  align="right"
                />

                <EducationCard
                  title="High School"
                  school="Nikola Tesla - Sremska Mitrovica"
                  logo="./logos/tesla.png"
                  period="2015 – 2019"
                  align="left"
                />
              </div>
            </div>

            <div className="md:sticky md:top-32">
              <h3 className="text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold tracking-tight">
                Education
              </h3>
              <p className="mt-6 text-slate-300 text-lg lg:text-lg 2xl:text-xl 3xl:text-2xl leading-relaxed max-w-md">
                Computer engineering with a focus on system design, programming
                and problem solving.
              </p>
              <p className="mt-4 text-slate-400 text-base lg:text-base 2xl:text-lg 3xl:text-xl leading-relaxed max-w-md">
                My academic foundation began at Nikola Tesla Technical School,
                followed by a Bachelor's in Business Informatics at Sirmijum,
                where I developed a strong grasp of how technology integrates
                with business systems. I'm currently pursuing a Master's in
                Computer Engineering at VIŠER, focusing on system architecture,
                algorithm design, and software engineering principles. Beyond
                formal studies, I've consistently invested time in self-directed
                learning through game development, frontend engineering, and
                hands-on project work.
              </p>
              <div className="mt-10 h-1 w-24 rounded-full bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 overflow-hidden relative bg-slate-900"
      >
        <div className="absolute inset-0 w-full bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-extrabold tracking-tight mb-3">
              Feel free to{" "}
              <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                reach out
              </span>
            </h2>
            <p className="text-slate-300 text-lg lg:text-lg 2xl:text-xl 3xl:text-2xl">
              Got an idea, a project, or need something done in my field of
              expertise?
            </p>
            <p className="text-slate-300 text-lg lg:text-lg 2xl:text-xl 3xl:text-2xl">Here you can find me:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <a
                href="mailto:marko.bakula2000@gmail.com"
                className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-400 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                  📧
                </div>
                <div>
                  <div className="text-sm text-slate-400">Email</div>
                  <div className="font-medium group-hover:text-indigo-300">
                    marko.bakula2000@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+381677639977"
                className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-400 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                  📞
                </div>
                <div>
                  <div className="text-sm text-slate-400">Phone</div>
                  <div className="font-medium group-hover:text-indigo-300">
                    +381 67 763 9977
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <div className="text-sm text-slate-400">Location</div>
                  <div className="font-medium">Belgrade, Serbia</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                [
                  "🔗",
                  "LinkedIn",
                  "https://www.linkedin.com/in/marko-bakula-7335462b7/",
                ],
                ["💻", "GitHub", "https://github.com/MarkoBakula"],
                [
                  "💬",
                  "Discord",
                  "https://discord.com/users/292648246692544522",
                ],
                ["🎮", "Itch.io", "https://bungalov.itch.io"],
              ].map(([icon, label, link]) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-400 hover:-translate-y-1 transition-all duration-200 text-center group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                    {icon}
                  </span>
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Belgrade · Open to remote work and collaboration
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center relative bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Marko Bakula · Built with React &
            Tailwind · Thanks for stopping by!
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, 15px) rotate(-5deg); }
          75% { transform: translate(-15px, -5px) rotate(3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 18s ease-in-out infinite reverse;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }

        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}