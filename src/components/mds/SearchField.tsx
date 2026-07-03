type SearchFieldProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchField({
  onChange,
  placeholder,
  value
}: SearchFieldProps) {
  return (
    <label className="flex h-11 items-center gap-2 rounded-[14px] bg-white px-4 shadow-card">
      <span aria-hidden="true" className="text-sm text-black/25">
        o
      </span>
      <input
        aria-label={placeholder}
        className="w-full bg-transparent text-[12px] text-ink outline-none placeholder:text-[#a3a39a]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </label>
  );
}
