import type { SkillGroup } from "../types/portfolio";

interface SkillsProps {
  skills: SkillGroup[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <div className="skill-groups">
      {skills.map((group) => (
        <article className="mini-panel" key={group.id}>
          <h3>{group.label}</h3>
          <div className="skill-cloud">
            {group.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
