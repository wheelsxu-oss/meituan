import { jsx as _jsx } from "react/jsx-runtime";
export function SegmentedControl({ onChange, options, value }) {
    return (_jsx("div", { className: "grid grid-cols-2 gap-2 rounded-2xl bg-white p-1 shadow-card", children: options.map((option) => (_jsx("button", { className: [
                "rounded-xl px-3 py-2 text-[12px] font-semibold transition",
                option.value === value
                    ? "bg-brand text-ink"
                    : "bg-transparent text-black/55"
            ]
                .filter(Boolean)
                .join(" "), onClick: () => onChange(option.value), type: "button", children: option.label }, option.value))) }));
}
