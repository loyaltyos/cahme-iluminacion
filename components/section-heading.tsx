export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-camhe-red">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-black leading-tight text-camhe-black md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-base leading-7 text-camhe-steel md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
