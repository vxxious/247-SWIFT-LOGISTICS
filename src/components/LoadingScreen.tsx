import { motion } from "framer-motion";

const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
    <motion.div
      className="w-10 h-10 rounded-lg bg-primary"
      animate={{ rotate: 360, scale: [1, 0.8, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
    <p className="text-sm text-muted-foreground font-medium tracking-wide">Loading…</p>
  </div>
);

export default LoadingScreen;
