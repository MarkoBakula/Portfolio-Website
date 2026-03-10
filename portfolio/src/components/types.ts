export type Project = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  gifSrc: string;
  technologies?: string[];
  icon?: string;
  iconBg?: string;
  liveLink?: string;
  githubLink?: string;
  itchLink?: string;
};

export type ExpandableCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icons: string[];
  projects: Project[];
  category: 'web' | 'game' | 'motion';
};

export type ExperienceCardProps = {
  role: string;
  company: string;
  logo: string;
  period: string;
  description: string;
};

export type EducationCardProps = {
  title: string;
  school: string;
  logo: string;
  period: string;
  align: "left" | "right";
  big?: boolean;
  current?: boolean;
};