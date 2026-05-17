export function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-lg text-slate-400">{subtitle}</p> : null}
    </div>
  );
}
