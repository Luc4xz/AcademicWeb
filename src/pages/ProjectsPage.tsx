import { useCallback } from "react";
import { ErrorState } from "../components/ErrorState";
import { GitHubRepos } from "../components/GitHubRepos";
import { LoadingState } from "../components/LoadingState";
import { PageHero } from "../components/PageHero";
import { Projects } from "../components/Projects";
import { SectionReveal } from "../components/SectionReveal";
import { useApiResource } from "../hooks/useApiResource";
import { getProjects } from "../services/api";

export default function ProjectsPage() {
  const loader = useCallback(() => getProjects(), []);
  const { data, error, loading } = useApiResource(loader);

  return (
    <main className="page-main">
      <PageHero title="Projects">
        Selected design, HCI, AI, and technical projects with live filtering and repository activity.
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionReveal>
            {loading ? <LoadingState label="Loading projects" /> : null}
            {error ? <ErrorState message={error} /> : null}
            {data ? <Projects projects={data} /> : null}
          </SectionReveal>
        </div>
      </section>
      <section className="section subtle" aria-labelledby="github-title">
        <div className="container">
          <div className="section-heading full">
            <h2 id="github-title">GitHub Repositories</h2>
          </div>
          <SectionReveal>
            <GitHubRepos />
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
