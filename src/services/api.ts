import axios from "axios";
import { education, experiences, journeyGraph, profile, projects, research, skills } from "../data/portfolio";
import type {
  ContactPayload,
  ContactResponse,
  EducationItem,
  ExperienceItem,
  GitHubRepository,
  JourneyGraph,
  Profile,
  Project,
  ResearchItem,
  SkillGroup
} from "../types/portfolio";

const api = axios.create({
  baseURL: "/api",
  timeout: 8000
});

async function getWithFallback<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await api.get<T>(path);
    return response.data;
  } catch (error) {
    console.warn(`Falling back to local data for ${path}`, error);
    return fallback;
  }
}

export function getProfile(): Promise<Profile> {
  return getWithFallback<Profile>("/profile", profile);
}

export function getProjects(): Promise<Project[]> {
  return getWithFallback<Project[]>("/projects", projects);
}

export function getSkills(): Promise<SkillGroup[]> {
  return getWithFallback<SkillGroup[]>("/skills", skills);
}

export function getResearch(): Promise<ResearchItem[]> {
  return getWithFallback<ResearchItem[]>("/research", research);
}

export function getExperience(): Promise<ExperienceItem[]> {
  return getWithFallback<ExperienceItem[]>("/experience", experiences);
}

export function getEducation(): Promise<EducationItem[]> {
  return getWithFallback<EducationItem[]>("/education", education);
}

export function getJourney(): Promise<JourneyGraph> {
  return getWithFallback<JourneyGraph>("/journey", journeyGraph);
}

export function getGitHubRepositories(): Promise<GitHubRepository[]> {
  return getWithFallback<GitHubRepository[]>("/github/repos", []);
}

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const response = await api.post<ContactResponse>("/contact", payload);
  return response.data;
}
