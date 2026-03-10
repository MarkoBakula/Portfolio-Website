import type { Project } from '../components/types';

export const webProjects: Project[] = [
  {
    title: "Portfolio",
    shortDescription: "The page you somehow found yourself right now",
    fullDescription: "Built with React and Tailwind. Smooth animations, nested expandable cards with GIF demos, and a dark theme that's easy on the eyes. The component structure is designed to be reusable and maintainable, while also using a bunch of pretty optimized assets i made.",
    gifSrc: "/gifs/portfolio-demo.gif",
    technologies: ["React", "TypeScript", "Tailwind"],
    icon: "/icons/web-react.png",
    iconBg: "bg-indigo-500/30",
    liveLink: "#top",
    githubLink: "https://github.com/MarkoBakula/Portfolio-Website"
  },
  {
    title: "E-Commerce (WIP)",
    shortDescription: "Building an online store from the ground up",
    fullDescription: "A collage project that i was rather happy with but ended up scrapping most of it, when finished it should look like a pretty fancy e-commerce shop application",
    gifSrc: "/gifs/ecommerce-demo.gif",
    technologies: ["Node.js", "PostgreSQL", "React"],
    icon: "/icons/nodejs.png",
    iconBg: "bg-cyan-500/30",
    liveLink: "#",
    githubLink: "https://github.com/MarkoBakula"
  }
];

export const gameProjects: Project[] = [
  {
    title: "Koi Rush",
    shortDescription: "A fish-eating-fish game made in a week",
    fullDescription: "Control a koi fish in a peaceful pond, eat smaller fish to grow, and avoid the bigger ones. Built in unity for a solo week long game jam. Features a creative and original movement system, a simple growth mechanic, and a calming pond atmosphere with a black-white-red palette with all assets aswell as programming made by myself.",
    gifSrc: "/gifs/koi-rush.gif",
    technologies: ["Unity", "C#", "Procedural Animations"],
    icon: "/icons/koi-icon.png",
    iconBg: "bg-white",
    itchLink: "https://bungalov.itch.io/koi-rush"
  },
  {
    title: "Jotungrowth",
    shortDescription: "Viking puzzle and platfomring game with a shrinking potion main mechanic",
    fullDescription: "Made in Unreal Engine 5 for a game jam. You're a viking with a shrinking potion, shrink to sneak through tiny passages and solve fun and a bit too hard platforming puzzles. Cozy aesthetics and focus on the environment.",
    gifSrc: "/gifs/jotungrowth.gif",
    technologies: ["Unreal 5", "Blueprints", "Level Design"],
    icon: "/icons/jotun-icon.png",
    iconBg: "bg-blue-400",
    itchLink: "https://emptystudio.itch.io/jotengrowth"
  },
  {
    title: "Loop & Load",
    shortDescription: "Turn-based roguelike made in 48 hours",
    fullDescription: "Inspired by Loop Hero, this was a 2-day game jam experiment. Top-down turn-based combat, procedural loot, and resource management all in a made with a pixel-art based black-and-neon aesthetic.",
    gifSrc: "/gifs/loop-load.gif",
    technologies: ["Unity", "C#", "Turn-based"],
    icon: "/icons/loop-icon.png",
    iconBg: "bg-green-400",
    itchLink: "https://bungalov.itch.io/loop-load"
  }
];

export const motionProjects: Project[] = [
  {
    title: "Saudi Real Estate AI Ad",
    shortDescription: "AI-assisted luxury property promo",
    fullDescription: "A promotional video for a fake Saudi real estate agency, blending AI generated visuals with motion graphics. Dynamic transitions, Arabic landscapes, and warm desert tones all crafted to feel luxurious and modern.",
    gifSrc: "/gifs/saudi-realestate.gif",
    technologies: ["After Effects", "AI Tools","Midjourney", "Premiere"],
    icon: "/icons/saudi-icon.png",
    iconBg: "bg-[#D2B48C]"
  }
];