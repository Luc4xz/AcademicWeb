import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface SectionRevealProps extends PropsWithChildren {
  className?: string;
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
