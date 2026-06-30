import { useCallback } from "react";
import { Education } from "../components/Education";
import { ErrorState } from "../components/ErrorState";
import { Experience } from "../components/Experience";
import { LoadingState } from "../components/LoadingState";
import { PageHero } from "../components/PageHero";
import { SectionReveal } from "../components/SectionReveal";
import { Skills } from "../components/Skills";
import { useApiResource } from "../hooks/useApiResource";
import { getEducation, getExperience, getSkills } from "../services/api";

export default function ExperiencePage() {
  const experienceLoader = useCallback(() => getExperience(), []);
  const educationLoader = useCallback(() => getEducation(), []);
  const skillsLoader = useCallback(() => getSkills(), []);
  const experienceState = useApiResource(experienceLoader);
  const educationState = useApiResource(educationLoader);
  const skillsState = useApiResource(skillsLoader);

  return (
    <main className="page-main">
      <PageHero title="Experience">
        Education, industry experience, and technical skills organized as reusable typed data.
      </PageHero>
      <section className="section">
        <div className="container content-grid">
          <div className="section-heading">
            <h2>Experience</h2>
          </div>
          <SectionReveal>
            {experienceState.loading ? <LoadingState label="Loading experience" /> : null}
            {experienceState.error ? <ErrorState message={experienceState.error} /> : null}
            {experienceState.data ? <Experience experiences={experienceState.data} /> : null}
          </SectionReveal>
        </div>
      </section>
      <section className="section subtle">
        <div className="container content-grid">
          <div className="section-heading">
            <h2>Education</h2>
          </div>
          <SectionReveal>
            {educationState.loading ? <LoadingState label="Loading education" /> : null}
            {educationState.error ? <ErrorState message={educationState.error} /> : null}
            {educationState.data ? <Education education={educationState.data} /> : null}
          </SectionReveal>
        </div>
      </section>
      <section className="section">
        <div className="container content-grid">
          <div className="section-heading">
            <h2>Skills</h2>
          </div>
          <SectionReveal>
            {skillsState.loading ? <LoadingState label="Loading skills" /> : null}
            {skillsState.error ? <ErrorState message={skillsState.error} /> : null}
            {skillsState.data ? <Skills skills={skillsState.data} /> : null}
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
