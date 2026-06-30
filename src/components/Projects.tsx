import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "../types/portfolio";
import { projectCategories } from "../data/portfolio";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
  projects: Project[];
  searchable?: boolean;
}

export function Projects({ projects, searchable = true }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const categoryMatches = activeCategory === "All" || project.categories.includes(activeCategory);
      const queryTarget = [project.title, project.description, ...project.technologies, ...project.categories]
        .join(" ")
        .toLowerCase();
      const queryMatches = normalizedQuery.length === 0 || queryTarget.includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [activeCategory, projects, query]);

  return (
    <>
      {searchable ? (
        <div className="project-tools" aria-label="Project filters">
          <label className="search-control">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, technologies, descriptions"
            />
          </label>
          <div className="filter-row" role="list" aria-label="Project categories">
            {(["All", ...projectCategories] as Array<ProjectCategory | "All">).map((category) => (
              <button
                className={activeCategory === category ? "active" : ""}
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="project-list" aria-live="polite">
        {filteredProjects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="status-note">No projects match the current filters.</p>
      ) : null}
    </>
  );
}
