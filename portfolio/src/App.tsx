import { useState } from "react";

/* ---------- TYPES ---------- */

type Project = {
  title: string;
  description: string;
};

type ExpandableCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icons: string[];
  projects: Project[];
};

/* ---------- COMPONENTS ---------- */

function ExpandableCard({
  title,
  subtitle,
  description,
  icons,
  projects,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`
        cursor-pointer rounded-3xl border border-white/10
        bg-gradient-to-br from-slate-900 via-slate-950 to-black
        p-8 transition-all duration-500
        shadow-[0_0_30px_rgba(99,102,241,0.25)]
        hover:shadow-[0_0_55px_rgba(99,102,241,0.45)]
        ${open ? "scale-[1.03]" : ""}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-indigo-300 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex gap-3 text-2xl opacity-80">
          {icons.map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>

      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] mt-8" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden space-y-8">
          <p className="text-slate-300 leading-relaxed">{description}</p>

          <div>
            <h4 className="font-semibold mb-4 text-slate-200">
              Selected Projects
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="
                    rounded-xl border border-white/10 p-4
                    bg-slate-900/80
                    shadow-[0_0_18px_rgba(99,102,241,0.2)]
                  "
                >
                  <h5 className="font-bold">{p.title}</h5>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  role,
  company,
  period,
  description,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
}) {
  return (
    <div
      className="
        rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950
        border border-white/10 p-6
        shadow-[0_0_25px_rgba(99,102,241,0.25)]
        hover:shadow-[0_0_45px_rgba(99,102,241,0.45)]
        transition-all duration-300
      "
    >
      <h4 className="font-bold text-lg">{role}</h4>
      <p className="text-indigo-300 text-sm mt-1">
        {company} · {period}
      </p>
      <p className="text-slate-300 mt-4 leading-relaxed">{description}</p>
    </div>
  );
}

function EducationCard({
  title,
  school,
  period,
  align,
  big,
  current,
}: {
  title: string;
  school: string;
  period: string;
  align: "left" | "right";
  big?: boolean;
  current?: boolean;
}) {
  return (
    <div
      className={`relative flex ${
        align === "left" ? "justify-start pr-8" : "justify-end pl-8"
      }`}
    >
      {!big && (
        <span className="absolute left-1/2 top-12 -translate-x-1/2 z-10">
          <span className="block w-4 h-4 rounded-full bg-indigo-400" />
          <span className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-60" />
        </span>
      )}

      <div
        className={`
          relative rounded-3xl border border-white/10
          transition-all duration-500
          ${
            big
              ? "w-full md:w-[75%] p-10 scale-[1.06] bg-gradient-to-br from-indigo-900/25 via-slate-900 to-slate-950"
              : "w-full md:w-[52%] p-8 bg-gradient-to-br from-slate-900 to-slate-950"
          }
          ${
            current
              ? "shadow-[0_0_70px_rgba(99,102,241,0.6)] hover:shadow-[0_0_100px_rgba(99,102,241,0.85)]"
              : "shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_55px_rgba(99,102,241,0.5)]"
          }
          hover:-translate-y-2
        `}
      >
        {current && (
          <span
            className="
              absolute -top-5 right-10 px-5 py-1 text-xs font-bold tracking-widest
              rounded-full bg-indigo-600
              shadow-[0_0_20px_rgba(99,102,241,0.8)]
            "
          >
            CURRENT
          </span>
        )}

        <h3 className={`font-extrabold ${big ? "text-3xl" : "text-xl"}`}>
          {title}
        </h3>

        <p className="text-indigo-300 mt-2">{school}</p>
        <p className="text-sm text-slate-400 mt-4">{period}</p>
      </div>
    </div>
  );
}

/* ---------- APP ---------- */

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 py-7 flex items-center justify-between">
          <div className="flex gap-8 text-sm font-medium">
            <a href="#skills" className="hover:text-indigo-300">Skills</a>
            <a href="#experience" className="hover:text-indigo-300">Experience</a>
            <a href="#education" className="hover:text-indigo-300">Education</a>
            <a href="#contact" className="hover:text-indigo-300">Contact</a>
          </div>

          <div className="font-extrabold text-xl tracking-wide">
            Marko Bakula
          </div>
        </nav>
      </header>

{/* HERO */}
<section className="relative min-h-[90vh] flex items-start overflow-hidden">

  {/* background accents */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/20 blur-3xl rounded-full" />
  </div>

  <div className="relative max-w-6xl mx-auto px-6 w-full pt-[16vh]
">
    <div className="grid md:grid-cols-2 gap-20 items-center">
      {/* TEXT */}
      <div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          Marko Bakula
        </h1>

        <p className="mt-6 text-xl md:text-2xl font-medium text-indigo-300">
          Frontend · Game · Motion Developer
        </p>

        <p className="mt-8 max-w-xl text-slate-300 leading-relaxed text-lg">
          I design and build interactive digital experiences across web,
          games and motion. My work focuses on strong visual feedback,
          intuitive user experience and clean, maintainable systems —
          bridging engineering precision with creative expression.
        </p>

        <div className="mt-12 flex flex-wrap gap-6">
          <a
            href="#contact"
            className="
              px-7 py-3 rounded-xl font-semibold
              bg-indigo-600
              shadow-[0_0_30px_rgba(99,102,241,0.6)]
              hover:bg-indigo-500
              hover:shadow-[0_0_50px_rgba(99,102,241,0.9)]
              transition-all
            "
          >
            Contact Me
          </a>

          <a
            href="#skills"
            className="
              px-7 py-3 rounded-xl font-semibold
              border border-white/15
              text-slate-200
              hover:border-indigo-400
              hover:text-indigo-300
              transition-all
            "
          >
            View Skills
          </a>
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative flex justify-center md:justify-end">
        <div className="absolute w-80 h-80 bg-indigo-500/30 blur-3xl rounded-full" />

        <div
          className="
            relative w-72 h-72 md:w-80 md:h-80 rounded-full
            overflow-hidden
            border border-white/15
            bg-slate-900
            shadow-[0_0_50px_rgba(99,102,241,0.5)]
          "
        >
          <img
            src="/profile.jpg"
            alt="Marko Bakula"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>

{/* SKILLS */}
<section
  id="skills"
  className="
    relative py-28
    bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950
  "
>

  {/* background accent */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-indigo-600/15 blur-3xl rounded-full" />
  </div>

  <div className="relative max-w-6xl mx-auto px-6">
    {/* section header */}
    <div className="text-center max-w-2xl mx-auto mb-24">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Skills & Focus
      </h2>
      <p className="mt-6 text-slate-300 text-lg md:text-xl leading-relaxed">
        My work spans multiple disciplines, but always with an emphasis on
        strong visual feedback, intuitive interaction and clean,
        maintainable systems.
      </p>
    </div>

    {/* cards */}
    <div className="space-y-16">
      {/* Web */}
      <ExpandableCard
        title="Web Development"
        subtitle="Frontend Architecture & UI Engineering"
        icons={["🌐", "⚛️", "🎨"]}
        description="I specialize in building modern, responsive and animated web interfaces using React, TypeScript and Tailwind. My focus is on clean component architecture, performance, accessibility and creating interfaces that feel responsive and polished."
        projects={[
          {
            title: "Portfolio Website",
            description:
              "Personal portfolio focused on motion, smooth interactions and scalable component structure.",
          },
          {
            title: "Admin Dashboard",
            description:
              "Data-driven dashboard with charts, filters, reusable UI components and responsive layouts.",
          },
        ]}
      />

      {/* Game */}
      <ExpandableCard
        title="Game Development"
        subtitle="Unity, Gameplay Systems & Tools"
        icons={["🎮", "🧠", "✨"]}
        description="I develop gameplay systems, tools and visual effects in Unity. My experience includes player controllers, game logic, editor tooling, shaders and performance-conscious implementations."
        projects={[
          {
            title: "Puzzle Game Prototype",
            description:
              "Grid-based puzzle mechanics, progression systems and level logic built in Unity.",
          },
          {
            title: "Action Gameplay Prototype",
            description:
              "Character movement, combat systems, feedback effects and prototyping workflows.",
          },
        ]}
      />

      {/* Motion */}
      <ExpandableCard
        title="Video Editing & Motion"
        subtitle="After Effects & Motion Design"
        icons={["🎬", "🌀", "✨"]}
        description="I create motion graphics and animated content using After Effects, focusing on clarity, rhythm and visual storytelling."
        projects={[
          {
            title: "Promotional Motion Video",
            description:
              "Short-form promotional video combining typography, motion and visual pacing.",
          },
          {
            title: "Logo Animation",
            description:
              "Animated logo reveal designed for digital platforms and brand identity.",
          },
        ]}
      />
    </div>
  </div>
</section>


 {/* EXPERIENCE */}
<section
  id="experience"
  className="
    relative min-h-screen
    flex items-center
  "
>
  {/* background accent */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-40 right-[-200px] w-[700px] h-[700px] bg-indigo-600/15 blur-3xl rounded-full" />
  </div>

  <div className="relative max-w-6xl mx-auto px-6 w-full py-32">
    <div className="grid md:grid-cols-2 gap-20 items-start">
      
      {/* LEFT – INTRO */}
      <div className="sticky top-32">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Work Experience
        </h2>

        <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
          Hands-on experience across frontend development and real-time
          interactive systems, working in both structured product teams
          and fast-moving technical environments.
        </p>

        <div className="mt-10 h-1 w-24 rounded-full bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
      </div>

      {/* RIGHT – CARDS */}
      <div className="space-y-10">
        <ExperienceCard
          role="Frontend Developer Intern"
          company="ERP Sirmium"
          period="2023"
          description="Worked on frontend development tasks, UI improvements and integration with backend services. Focused on improving usability, maintaining clean code and collaborating within an existing product codebase."
        />

        <ExperienceCard
          role="Operation Engineer / Unity Developer"
          company="Replai"
          period="2024"
          description="Worked on Unity-based systems, tools and gameplay features. Contributed to prototyping, iteration workflows and implementation of interactive systems used in production."
        />
      </div>
    </div>
  </div>
</section>
{/* EDUCATION */}
<section
  id="education"
  className="
    relative
    max-w-6xl mx-auto px-6
    py-28
  "
>
  <div className="grid md:grid-cols-[1.6fr_1fr] gap-20 items-start">
    
    {/* LEFT — TIMELINE */}
    <div className="relative">
      {/* vertical line */}
      <div className="pointer-events-none absolute left-1/2 top-[120px] bottom-0 -translate-x-1/2">

        <div className="absolute inset-0 w-[2px] bg-indigo-500/60" />
        <div className="absolute inset-0 w-[6px] bg-indigo-500/30 blur-xl" />
      </div>

      <div className="space-y-32 relative z-10">
        <EducationCard
          title="Master Studies – Computer Engineering"
          school="VIŠER – School of Electrical and Computer Engineering"
          period="2024 – Present"
          big
          current
          align="left"
        />

        <EducationCard
          title="Bachelor Studies – Business Informatics"
          school="VIŠER – School of Electrical and Computer Engineering"
          period="2021 – 2024"
          align="right"
        />

        <EducationCard
          title="Technical High School"
          school="Nikola Tesla Technical School"
          period="2017 – 2021"
          align="left"
        />
      </div>
    </div>

    {/* RIGHT — STICKY TEXT */}
    <div className="sticky top-32">
      <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Education
      </h3>

      <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
        My academic path is centered around computer engineering with a
        strong focus on applied knowledge, system design and real-world
        problem solving.
      </p>

      <p className="mt-4 text-slate-400 leading-relaxed max-w-md">
        I treat education as an evolving process — combining formal
        studies with independent exploration of game development,
        frontend architecture and interactive systems.
      </p>

      <div className="mt-10 h-1 w-24 rounded-full bg-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
    </div>
  </div>
</section>




      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-3xl font-bold mb-12 text-center">Contact</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-slate-300">
            <p className="text-lg leading-relaxed">
              If you’re interested in collaboration, freelance work or
              full-time opportunities, feel free to reach out. I’m always
              open to discussing new ideas and interesting projects.
            </p>

            <div className="space-y-2">
              <p className="text-indigo-300 font-medium">
                📧 email@example.com
              </p>
              <p className="text-indigo-300 font-medium">
                📞 +381 60 123 4567
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["🔗", "LinkedIn"],
              ["💻", "GitHub"],
              ["📁", "Portfolio"],
              ["✉️", "Send Email"],
            ].map(([icon, label]) => (
              <a
                key={label}
                href="#"
                className="
                  flex items-center gap-3 rounded-2xl border border-white/10
                  bg-slate-900/80 p-5
                  transition-all duration-300
                  shadow-[0_0_22px_rgba(99,102,241,0.25)]
                  hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]
                  hover:-translate-y-1
                "
              >
                <span className="text-2xl">{icon}</span>
                <span className="font-semibold">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Marko Bakula · Built with React & Tailwind
      </footer>
    </div>
  );
}
