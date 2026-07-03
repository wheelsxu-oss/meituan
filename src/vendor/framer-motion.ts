type MotionNamespace = {
  AnimatePresence: typeof import("framer-motion")["AnimatePresence"];
  motion: typeof import("framer-motion")["motion"];
};

const MotionGlobal = (window as typeof window & { Motion: MotionNamespace }).Motion;

export const { AnimatePresence, motion } = MotionGlobal;
