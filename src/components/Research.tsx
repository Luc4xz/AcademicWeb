import type { ResearchItem } from "../types/portfolio";

interface ResearchProps {
  research: ResearchItem[];
}

export function Research({ research }: ResearchProps) {
  return (
    <div className="project-list">
      {research.map((item) => (
        <article className="research-card" key={item.id}>
          <a className="media-frame" href={item.url} target="_blank" rel="noopener noreferrer">
            <img src={item.image} alt={item.imageAlt} loading="lazy" />
          </a>
          <div className="card-copy">
            <p className="card-kicker">{item.role}</p>
            <h3>{item.title}</h3>
            <p className="byline">{item.byline}</p>
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
            <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer">
              People and Robots Lab
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
