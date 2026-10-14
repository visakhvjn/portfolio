export function SectionHeading({
  id,
  title,
  subtitle,
  subtitleNoWrap,
  eyebrow,
  className = "",
}: {
  id: string;
  title: string;
  subtitle?: string;
  /** Keep subtitle on a single line (horizontal scroll on narrow viewports). */
  subtitleNoWrap?: boolean;
  /** Small label above the title, e.g. a section number. */
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div id={id} className={`scroll-mt-24 ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={
            subtitleNoWrap
              ? "mt-3 overflow-x-auto text-base whitespace-nowrap text-muted sm:text-lg"
              : "mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          }
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
