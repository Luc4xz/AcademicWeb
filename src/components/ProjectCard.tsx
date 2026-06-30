import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "../types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="project-card"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link className="media-frame" to={`/projects/${project.id}`} aria-label={`Open ${project.title}`}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
      </Link>
      <div className="card-copy">
        <p className="card-kicker">{project.kicker}</p>
        <h3>{project.title}</h3>
        <p className="byline">{project.byline}</p>
        <p>{project.description}</p>
        <div className="skill-cloud compact" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <Link className="text-link" to={`/projects/${project.id}`}>
          Link to project
        </Link>
      </div>
    </motion.article>
  );
}
