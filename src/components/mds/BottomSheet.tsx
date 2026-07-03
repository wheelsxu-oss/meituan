import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "../../vendor/framer-motion.js";

type BottomSheetProps = PropsWithChildren<{
  open: boolean;
}>;

export function BottomSheet({ children, open }: BottomSheetProps) {
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
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 rounded-t-[24px] bg-white px-6 pb-8 pt-5"
            exit={{ opacity: 0, y: 28 }}
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.24 }}
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-black/10" />
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
