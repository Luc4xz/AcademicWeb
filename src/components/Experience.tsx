import type { ExperienceItem } from "../types/portfolio";

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <div className="timeline-list">
      {experiences.map((item) => (
        <article className="timeline-item" key={item.id}>
          <p className="card-kicker">{item.period}</p>
          <h3>{item.role}</h3>
          <p className="byline">
            {item.organization} | {item.location}
          </p>
          <ul className="detail-list">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="skill-cloud compact">
            {item.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
