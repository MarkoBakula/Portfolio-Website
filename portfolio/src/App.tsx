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
        bg-gradient-to-br from-slate-900 to-slate-950
        p-8 transition-all duration-500
        shadow-[0_0_35px_rgba(99,102,241,0.45)]
        hover:shadow-[0_0_65px_rgba(139,92,246,0.85)]
        ${open ? "scale-[1.03]" : ""}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-indigo-400 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="flex gap-3 text-2xl">
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
        <div className="overflow-hidden space-y-6">
          <p className="text-slate-300">{description}</p>

          <div>
            <h4 className="font-semibold mb-3">Projects</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-white/10 p-4 bg-slate-900
                    shadow-[0_0_20px_rgba(99,102,241,0.25)]
                  "
                >
                  <h5 className="font-bold">{p.title}</h5>
                  <p className="text-sm text-slate-400 mt-1">
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
        shadow-[0_0_30px_rgba(99,102,241,0.35)]
        hover:shadow-[0_0_55px_rgba(139,92,246,0.75)]
        transition-all duration-300
      "
    >
      <h4 className="font-bold text-lg">{role}</h4>
      <p className="text-indigo-400 text-sm">
        {company} · {period}
      </p>
      <p className="text-slate-300 mt-4">{description}</p>
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
      {/* Timeline node */}
      <span className="absolute left-1/2 top-12 -translate-x-1/2 z-10">
        <span className="block w-4 h-4 rounded-full bg-indigo-400" />
        <span className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-80" />
      </span>

      <div
        className={`
          relative rounded-3xl border border-white/10
          transition-all duration-500
          ${
            big
              ? "w-full md:w-[75%] p-10 scale-[1.06] bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-950"
              : "w-full md:w-[52%] p-8 bg-gradient-to-br from-slate-900 to-slate-950"
          }
          ${
            current
              ? "shadow-[0_0_80px_rgba(99,102,241,0.8)] hover:shadow-[0_0_120px_rgba(139,92,246,1)]"
              : "shadow-[0_0_35px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.7)]"
          }
          hover:-translate-y-2
        `}
      >
        {current && (
          <span
            className="
              absolute -top-5 right-10 px-5 py-1 text-xs font-bold tracking-widest
              rounded-full bg-gradient-to-r from-indigo-500 to-purple-500
              shadow-[0_0_25px_rgba(139,92,246,0.9)]
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
            <a href="#skills" className="hover:text-indigo-400">Skills</a>
            <a href="#experience" className="hover:text-indigo-400">Experience</a>
            <a href="#education" className="hover:text-indigo-400">Education</a>
            <a href="#contact" className="hover:text-indigo-400">Contact</a>
          </div>

          <div className="font-extrabold text-xl tracking-wide">
            Marko Bakula
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <h1 className="text-5xl font-extrabold">Marko Bakula</h1>
        <p className="text-indigo-400 text-xl mt-3">
          Frontend · Game · Motion Developer
        </p>
        <p className="max-w-3xl text-slate-300 mt-8 leading-relaxed">
          I build interactive experiences across web, games and motion.
          My focus is on strong visual feedback, polished UX and clean,
          scalable architecture — blending technical precision with creativity.
        </p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 space-y-10">
        <ExpandableCard
          title="Web Development"
          subtitle="Frontend & UI Engineering"
          icons={["🌐", "⚛️", "🎨"]}
          description="Building modern, responsive and animated interfaces with React, TypeScript and Tailwind."
          projects={[
            { title: "Portfolio Website", description: "Personal portfolio with animations." },
            { title: "Admin Dashboard", description: "Analytics dashboard with charts and filters." },
          ]}
        />

        <ExpandableCard
          title="Game Development"
          subtitle="Unity & Gameplay Systems"
          icons={["🎮", "🧠", "✨"]}
          description="Gameplay programming, tools, shaders and systems built in Unity."
          projects={[
            { title: "Puzzle Game", description: "Grid-based mechanics and progression." },
            { title: "Action Prototype", description: "Movement, combat and effects." },
          ]}
        />

        <ExpandableCard
          title="Video Editing"
          subtitle="After Effects & Motion Design"
          icons={["🎬", "🌀", "✨"]}
          description="Motion graphics, animated UI, transitions and visual storytelling."
          projects={[
            { title: "Promo Video", description: "Short promotional motion piece." },
            { title: "Logo Animation", description: "Animated logo reveal." },
          ]}
        />
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-32 space-y-8">
        <h2 className="text-3xl font-bold">Work Experience</h2>

        <ExperienceCard
          role="Frontend Developer Intern"
          company="ERP Sirmium"
          period="2023"
          description="Worked on frontend features, UI improvements and integration with backend systems."
        />

        <ExperienceCard
          role="Operation Engineer / Unity Developer"
          company="Replai"
          period="2024"
          description="Developed Unity-based gameplay systems, tools and interactive features."
        />
      </section>

      {/* EDUCATION */}
      <section id="education" className="relative max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-3xl font-bold mb-24 text-center">Education</h2>

        {/* Timeline line */}
        <div className="pointer-events-none absolute left-1/2 top-48 bottom-24 -translate-x-1/2">
          <div className="absolute inset-0 w-[2px] bg-gradient-to-b from-indigo-400 via-purple-500/70 to-transparent" />
          <div className="absolute inset-0 w-[6px] bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-transparent blur-xl" />
        </div>

        <div className="space-y-32">
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
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-3xl font-bold mb-8">Contact</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 text-slate-300">
            <p>
              Interested in collaboration, freelance work or opportunities?
              Feel free to reach out.
            </p>
            <p className="text-indigo-400">email@example.com</p>
            <p className="text-indigo-400">+381 60 123 4567</p>
          </div>

          <div className="flex flex-col gap-4 text-indigo-400">
            <a href="#" className="hover:underline">LinkedIn</a>
            <a href="#" className="hover:underline">GitHub</a>
            <a href="#" className="hover:underline">Portfolio</a>
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
