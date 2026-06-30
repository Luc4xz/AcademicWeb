import { useCallback } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useApiResource } from "../hooks/useApiResource";
import { getProjects } from "../services/api";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const loader = useCallback(() => getProjects(), []);
  const { data, error, loading } = useApiResource(loader);
  const project = data?.find((item) => item.id === projectId);

  if (loading) {
    return <LoadingState label="Loading project" />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className="page-main">
      <section className="project-detail-hero">
        <div className="container detail-grid">
          <div>
            <Link className="back-link" to="/projects">
              Back to projects
            </Link>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
          <img src={project.image} alt={project.imageAlt} />
        </div>
      </section>

      <section className="section">
        <div className="container narrow prose">
          {project.detail.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
