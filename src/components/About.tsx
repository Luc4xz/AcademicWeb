import { education, skills } from "../data/portfolio";
import { SectionReveal } from "./SectionReveal";

export function About() {
  return (
    <section className="section subtle" aria-labelledby="about-overview-title">
      <div className="container content-grid">
        <div className="section-heading">
          <h2 id="about-overview-title">Overview</h2>
        </div>
        <SectionReveal>
          <div className="split-list">
            {education.map((item) => (
              <article className="mini-panel" key={item.id}>
                <p className="card-kicker">{item.period}</p>
                <h3>{item.institution}</h3>
                <p className="byline">{item.degree}</p>
                <ul className="detail-list">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="skill-cloud" aria-label="Skills overview">
            {skills.flatMap((group) => group.skills).map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
