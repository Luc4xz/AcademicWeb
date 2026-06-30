import type { EducationItem } from "../types/portfolio";

interface EducationProps {
  education: EducationItem[];
}

export function Education({ education }: EducationProps) {
  return (
    <div className="timeline-list">
      {education.map((item) => (
        <article className="timeline-item" key={item.id}>
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
  );
}
