export type ProjectCategory =
  | "AI"
  | "Human-Computer Interaction"
  | "Web Development"
  | "Data Visualization"
  | "Java"
  | "Python"
  | "Research";

export interface ProfileLink {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}

export interface Profile {
  name: string;
  affiliation: string;
  location: string;
  email: string;
  portrait: string;
  bio: string[];
  interests: Array<{
    label: string;
    value: string;
  }>;
  links: ProfileLink[];
}

export interface Project {
  id: string;
  title: string;
  kicker: string;
  byline: string;
  description: string;
  image: string;
  imageAlt: string;
  categories: ProjectCategory[];
  technologies: string[];
  detail: string[];
}

export interface ResearchItem {
  id: string;
  role: string;
  title: string;
  byline: string;
  image: string;
  imageAlt: string;
  url: string;
  bullets: string[];
  technologies: string[];
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  details: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export interface Award {
  id: string;
  title: string;
  source: string;
  year: string;
}

export interface JourneyNode {
  id: string;
  label: string;
  group: "Education" | "Research" | "Industry" | "Skill" | "Project";
  year: number;
}

export interface JourneyLink {
  source: string;
  target: string;
  strength: number;
}

export interface JourneyGraph {
  nodes: JourneyNode[];
  links: JourneyLink[];
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
}
