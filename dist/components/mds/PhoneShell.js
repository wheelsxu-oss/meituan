import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PhoneShell({ backLabel = "<", children, onBack, pageTitle, showBack = true }) {
    return (_jsxs("div", { className: "relative h-[874px] w-[402px] overflow-hidden rounded-[54px] bg-paper shadow-phone", children: [_jsxs("div", { className: "absolute inset-x-0 top-0 z-20 h-[94px] bg-white", children: [_jsxs("div", { className: "flex items-end justify-between px-6 pb-4 pt-5 text-[17px] font-semibold", children: [_jsx("span", { children: "9:41" }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-3 w-4 rounded-sm border border-black/70" }), _jsx("span", { className: "h-3 w-4 rounded-sm border border-black/70" }), _jsx("span", { className: "h-4 w-6 rounded-[4px] border border-black/70" })] })] }), _jsxs("div", { className: "flex items-center gap-2 px-5 pb-3", children: [_jsx("button", { className: [
                                    "h-7 w-7 text-left text-[24px] leading-none text-ink",
                                    showBack ? "" : "pointer-events-none opacity-0"
                                ]
                                    .filter(Boolean)
                                    .join(" "), onClick: onBack, type: "button", children: backLabel }), _jsx("div", { className: "flex-1 pr-9 text-center text-[15px] font-bold text-[#1f1f1f]", children: pageTitle })] }), _jsx("div", { className: "h-px w-full bg-line" })] }), _jsx("div", { className: "absolute inset-x-0 bottom-0 h-[34px]", children: _jsx("div", { className: "absolute bottom-2 left-1/2 h-[5px] w-36 -translate-x-1/2 rounded-full bg-black" }) }), _jsx("div", { className: "absolute inset-0 overflow-hidden pt-[94px]", children: children })] }));
}
