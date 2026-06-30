import { useCallback } from "react";
import { getGitHubRepositories } from "../services/api";
import { useApiResource } from "../hooks/useApiResource";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";

export function GitHubRepos() {
  const loader = useCallback(() => getGitHubRepositories(), []);
  const { data, error, loading } = useApiResource(loader);

  if (loading) {
    return <LoadingState label="Loading GitHub repositories" />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data || data.length === 0) {
    return <p className="status-note">GitHub repositories are unavailable right now.</p>;
  }

  return (
    <div className="repo-grid">
      {data.map((repo) => (
        <article className="repo-card" key={repo.id}>
          <h3>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </h3>
          <p>{repo.description || "No repository description provided."}</p>
          <dl>
            <div>
              <dt>Language</dt>
              <dd>{repo.language || "Mixed"}</dd>
            </div>
            <div>
              <dt>Stars</dt>
              <dd>{repo.stargazers_count}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{new Date(repo.updated_at).toLocaleDateString()}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
