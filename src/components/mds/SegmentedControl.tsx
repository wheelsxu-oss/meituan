type SegmentedOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  onChange,
  options,
  value
}: SegmentedControlProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-1 shadow-card">
      {options.map((option) => (
        <button
          className={[
            "rounded-xl px-3 py-2 text-[12px] font-semibold transition",
            option.value === value
              ? "bg-brand text-ink"
              : "bg-transparent text-black/55"
          ]
            .filter(Boolean)
            .join(" ")}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
