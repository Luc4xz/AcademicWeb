import { Link } from "react-router-dom";
import type { Profile } from "../types/portfolio";
import { SectionReveal } from "./SectionReveal";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero section" id="home">
      <div className="container hero-grid">
        <aside className="profile-panel" aria-label="Profile summary">
          <img className="portrait" src={profile.portrait} alt="Chengran Xu portrait" />
          <h1>{profile.name}</h1>
          <p className="affiliation">
            {profile.affiliation.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>

          <div className="profile-links" aria-label="Social and contact links">
            {profile.links.map((link) => {
              const content = (
                <>
                  <img className="profile-icon" src={link.icon} alt="" aria-hidden="true" />
                  <span>{link.label}</span>
                </>
              );

              if (link.href === "#") {
                return (
                  <span className="profile-link-item" key={link.label}>
                    {content}
                  </span>
                );
              }

              return (
                <a
                  className="profile-link-item"
                  href={link.href}
                  key={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </aside>

        <SectionReveal className="intro-copy">
          <div className="section-heading intro-heading">
            <h2 id="about">About</h2>
          </div>
          <div className="prose hero-prose">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="intro-actions">
            <Link className="button primary" to="/projects">
              View Projects
            </Link>
            <a className="button secondary" href="/cv/CV.pdf" target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </div>
          <dl className="interest-list" aria-label="Research interests">
            {profile.interests.map((interest) => (
              <div key={interest.label}>
                <dt>{interest.label}</dt>
                <dd>{interest.value}</dd>
              </div>
            ))}
          </dl>
        </SectionReveal>
      </div>
    </section>
  );
}
