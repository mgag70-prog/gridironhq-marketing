type Props = {
  label: string;
  title: string;
  titleAccent?: string;
  subhead?: string;
  center?: boolean;
};

export function SectionHeader({ label, title, titleAccent, subhead, center }: Props) {
  const renderTitle = () => {
    if (!titleAccent) return title;
    const parts = title.split(titleAccent);
    return (
      <>
        {parts[0]}
        <span className="text-orange">{titleAccent}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={center ? "text-center" : ""}>
      <div
        className={`flex items-center gap-2.5 mb-4 ${center ? "justify-center" : ""}`}
      >
        <div className="w-10 h-0.5 bg-orange" />
        <span className="font-condensed text-[13px] font-bold uppercase tracking-[1px] text-orange">
          {label}
        </span>
      </div>
      <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[1px] uppercase mb-4">
        {renderTitle()}
      </h2>
      {subhead && (
        <p
          className={`text-[18px] text-text-muted max-w-[560px] leading-[1.7] ${center ? "mx-auto" : ""}`}
        >
          {subhead}
        </p>
      )}
    </div>
  );
}
