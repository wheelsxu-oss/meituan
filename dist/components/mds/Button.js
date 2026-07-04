import { jsx as _jsx } from "react/jsx-runtime";
const variantClasses = {
    primary: "bg-brand text-ink hover:brightness-95",
    secondary: "bg-ink text-white hover:opacity-95",
    ghost: "bg-white text-ink ring-1 ring-black/5 hover:bg-white/90",
    muted: "bg-[#f3f3f1] text-black/65 hover:bg-[#ecebe7]"
};
const sizeClasses = {
    md: "h-10 px-4 text-[13px]",
    sm: "h-8 px-3 text-[12px]"
};
export function Button({ block, children, className = "", size = "md", type = "button", variant = "primary", ...props }) {
    return (_jsx("button", { className: [
            "inline-flex items-center justify-center rounded-xl font-semibold transition",
            block ? "w-full" : "",
            sizeClasses[size],
            variantClasses[variant],
            className
        ]
            .filter(Boolean)
            .join(" "), type: type, ...props, children: children }));
}
