import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "../../vendor/framer-motion.js";
export function BottomSheet({ children, open }) {
    return (_jsx(AnimatePresence, { children: open ? (_jsx(motion.div, { animate: { opacity: 1 }, className: "absolute inset-0 z-30 bg-black/35", exit: { opacity: 0 }, initial: { opacity: 0 }, children: _jsxs(motion.div, { animate: { opacity: 1, y: 0 }, className: "absolute bottom-0 left-0 right-0 rounded-t-[24px] bg-white px-6 pb-8 pt-5", exit: { opacity: 0, y: 28 }, initial: { opacity: 0, y: 28 }, transition: { duration: 0.24 }, children: [_jsx("div", { className: "mx-auto mb-4 h-1.5 w-14 rounded-full bg-black/10" }), children] }) })) : null }));
}
