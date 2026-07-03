import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "../../vendor/framer-motion.js";

type ModalProps = PropsWithChildren<{
  open: boolean;
}>;

export function Modal({ children, open }: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-30 bg-black/35"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mx-auto mt-80 w-[294px] rounded-[20px] bg-white p-5 shadow-2xl"
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
