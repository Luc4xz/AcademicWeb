interface PageHeroProps {
  title: string;
  children: string;
}

export function PageHero({ title, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
