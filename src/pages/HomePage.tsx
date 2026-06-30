import { useCallback } from "react";
import { ErrorState } from "../components/ErrorState";
import { Hero } from "../components/Hero";
import { LoadingState } from "../components/LoadingState";
import { Projects } from "../components/Projects";
import { Research } from "../components/Research";
import { SectionReveal } from "../components/SectionReveal";
import { useApiResource } from "../hooks/useApiResource";
import { getProfile, getProjects, getResearch } from "../services/api";

export default function HomePage() {
  const profileLoader = useCallback(() => getProfile(), []);
  const projectsLoader = useCallback(() => getProjects(), []);
  const researchLoader = useCallback(() => getResearch(), []);
  const profileState = useApiResource(profileLoader);
  const projectsState = useApiResource(projectsLoader);
  const researchState = useApiResource(researchLoader);

  return (
    <main>
      {profileState.loading ? <LoadingState label="Loading profile" /> : null}
      {profileState.error ? <ErrorState message={profileState.error} /> : null}
      {profileState.data ? <Hero profile={profileState.data} /> : null}

      <section className="section subtle" id="research" aria-labelledby="research-title">
        <div className="container">
          <div className="section-heading full">
            <h2 id="research-title">Research Experience</h2>
          </div>
          <SectionReveal>
            {researchState.loading ? <LoadingState label="Loading research" /> : null}
            {researchState.error ? <ErrorState message={researchState.error} /> : null}
            {researchState.data ? <Research research={researchState.data} /> : null}
          </SectionReveal>
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <div className="section-heading full">
            <h2 id="projects-title">Selected Projects</h2>
          </div>
          <SectionReveal>
            {projectsState.loading ? <LoadingState label="Loading projects" /> : null}
            {projectsState.error ? <ErrorState message={projectsState.error} /> : null}
            {projectsState.data ? <Projects projects={projectsState.data.slice(0, 2)} searchable={false} /> : null}
          </SectionReveal>
        </div>
      </section>

      <section className="section subtle" id="misc" aria-labelledby="misc-title">
        <div className="container content-grid">
          <div className="section-heading">
            <h2 id="misc-title">Misc</h2>
          </div>
          <ul className="misc-list">
            <li>Sports! I'm really into fitness training and I even joined a campus-wide powerlifting comp once.</li>
            <li>Traveling to new places and cultures. I especially love exploring new national parks in the United States.</li>
            <li>Music. Huge metalhead here. I'll literally travel to different cities just for live shows and concerts.</li>
            <li>Reading. I enjoy getting lost in different worlds, ideas, and perspectives through books of all kinds.</li>
            <li>
              Photography. I love capturing random moments and turning everyday life into memories through photos. Here
              are some collections of <a href="/photo-collection.html">my work</a>.
            </li>
            <li>
              Reflection. I have been casually writing <a href="/course-review.html">course reviews</a>, thoughts, and{" "}
              <a href="/blog.html">random blog posts</a> as a way to document ideas and experiences.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
