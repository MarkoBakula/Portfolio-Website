import { useEffect, useState } from 'react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      
      {/* NAV - Fixed header with scroll effect */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg' 
          : 'bg-slate-900/80 backdrop-blur-sm py-6'
      }`}>
        <div className="flex items-center justify-between px-8 max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            {/* Icon next to name */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            <h1 className="text-xl font-bold tracking-wide">Marko Bakula</h1>
          </div>
          <div className="space-x-6 text-sm">
            <a href="#projects" className="hover:text-indigo-400 transition-colors duration-300">Projects</a>
            <a href="#skills" className="hover:text-indigo-400 transition-colors duration-300">Skills</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        
        {/* HERO */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-32 space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Frontend & Game Developer
          </h2>
          <p className="max-w-xl text-slate-400 text-lg md:text-xl">
            I build interactive web experiences and games using modern tools
            like React, Tailwind, Unity, and Unreal Engine.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-slate-600 hover:border-indigo-400 hover:text-indigo-400 transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </section>

        {/* EXTENDED CONTENT - Added to make body longer */}
        <section id="projects" className="px-8 py-20">
          <h3 className="text-3xl font-bold mb-12 text-center tracking-tight">Featured Projects</h3>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "React Game Engine", desc: "Browser-based game development toolkit", tech: "React, Canvas, TypeScript" },
              { title: "Unity RPG Demo", desc: "3D role-playing game prototype", tech: "Unity, C#, Blender" },
              { title: "Portfolio Website", desc: "This responsive portfolio site", tech: "React, Tailwind, Vite" },
              { title: "Unreal FPS", desc: "First-person shooter with multiplayer", tech: "Unreal Engine, C++" },
              { title: "E-commerce Dashboard", desc: "Admin panel with real-time analytics", tech: "React, Node.js, WebSockets" },
              { title: "Mobile Puzzle Game", desc: "Cross-platform mobile game", tech: "Unity, C#, Firebase" },
            ].map((project, index) => (
              <div 
                key={index}
                className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors duration-300 border border-slate-700 hover:border-indigo-500/30"
              >
                <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                <p className="text-slate-400 mb-4">{project.desc}</p>
                <p className="text-sm text-indigo-400">{project.tech}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="px-8 py-20 bg-slate-800">
          <h3 className="text-3xl font-bold mb-12 text-center tracking-tight">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Unity",
              "Unreal Engine",
              "C#",
              "Git",
              "Game Design",
            ].map(skill => (
              <div
                key={skill}
                className="bg-slate-900 rounded-xl py-4 text-center font-medium hover:scale-105 hover:bg-slate-700 transition-all duration-300 shadow-sm border border-slate-800 hover:border-indigo-500/30"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION - Added more content */}
        <section className="px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center tracking-tight">About Me</h3>
            <div className="space-y-6 text-slate-300">
              <p>
                I'm a passionate developer with expertise in both frontend web development and game development. 
                I enjoy creating immersive user experiences, whether it's through responsive web applications 
                or engaging video games.
              </p>
              <p>
                My approach combines technical precision with creative problem-solving, ensuring that every 
                project not only functions flawlessly but also delivers an exceptional user experience.
              </p>
              <p>
                When I'm not coding, you can find me experimenting with new game mechanics, exploring the 
                latest web technologies, or contributing to open-source projects.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="px-8 py-16 bg-slate-950 text-center text-slate-400">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <p className="mb-8 max-w-xl mx-auto">
              Interested in collaborating or have a project in mind? 
              I'm always open to discussing new opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <a 
                href="mailto:marko@example.com" 
                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300"
              >
                Email Me
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-slate-600 hover:border-indigo-400 hover:text-indigo-400 transition-colors duration-300"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-slate-600 hover:border-indigo-400 hover:text-indigo-400 transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} Marko Bakula. All rights reserved.</p>
          </div>
        </footer>
        
      </div>
    </div>
  )
}