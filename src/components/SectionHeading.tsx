export function SectionHeading({
  id,
  title,
  subtitle,
  subtitleNoWrap,
}: {
  id: string;
  title: string;
  subtitle?: string;
  /** Keep subtitle on a single line (horizontal scroll on narrow viewports). */
  subtitleNoWrap?: boolean;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p
          className={
            subtitleNoWrap
              ? "mt-3 overflow-x-auto text-lg whitespace-nowrap text-slate-400"
              : "mt-3 max-w-2xl text-pretty text-lg text-slate-400"
          }
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
