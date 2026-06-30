import { useCallback } from "react";
import { ErrorState } from "../components/ErrorState";
import { JourneyVisualization } from "../components/JourneyVisualization";
import { LoadingState } from "../components/LoadingState";
import { PageHero } from "../components/PageHero";
import { Research } from "../components/Research";
import { SectionReveal } from "../components/SectionReveal";
import { useApiResource } from "../hooks/useApiResource";
import { getJourney, getResearch } from "../services/api";

export default function ResearchPage() {
  const researchLoader = useCallback(() => getResearch(), []);
  const journeyLoader = useCallback(() => getJourney(), []);
  const researchState = useApiResource(researchLoader);
  const journeyState = useApiResource(journeyLoader);

  return (
    <main className="page-main">
      <PageHero title="Research">
        Human-computer interaction, human-AI interaction, and service robot interaction work.
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionReveal>
            {researchState.loading ? <LoadingState label="Loading research" /> : null}
            {researchState.error ? <ErrorState message={researchState.error} /> : null}
            {researchState.data ? <Research research={researchState.data} /> : null}
          </SectionReveal>
        </div>
      </section>
      <section className="section subtle" aria-labelledby="research-map-title">
        <div className="container">
          <div className="section-heading full">
            <h2 id="research-map-title">Research Map</h2>
          </div>
          <SectionReveal>
            {journeyState.loading ? <LoadingState label="Loading research map" /> : null}
            {journeyState.error ? <ErrorState message={journeyState.error} /> : null}
            {journeyState.data ? <JourneyVisualization graph={journeyState.data} /> : null}
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
