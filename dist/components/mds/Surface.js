import { jsx as _jsx } from "react/jsx-runtime";
export function Surface({ children, className = "", interactive = false, ...props }) {
    return (_jsx("div", { className: [
            "rounded-[18px] bg-white shadow-card",
            interactive ? "transition hover:-translate-y-0.5" : "",
            className
        ]
            .filter(Boolean)
            .join(" "), ...props, children: children }));
}
