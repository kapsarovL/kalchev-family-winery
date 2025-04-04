import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useTransitionContext } from "../lib/transition-context";

interface PageTransitionProps {
  children: React.ReactNode;
}

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.02,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [location] = useLocation();
  const {
    isAnimating,
    setIsAnimating,
    previousPath,
    setPreviousPath,
    exitAnimation,
    setExitAnimation,
  } = useTransitionContext();

  useEffect(() => {
    // When the location changes, update the previous path
    // and set isAnimating to false (animation complete)
    if (previousPath !== location && isAnimating) {
      setTimeout(() => {
        setIsAnimating(false);
        setExitAnimation(false);
      }, 600); // Slightly longer than the animation duration to ensure completion
    }

    setPreviousPath(location);
  }, [
    location,
    previousPath,
    isAnimating,
    setIsAnimating,
    setPreviousPath,
    setExitAnimation,
  ]);

  // If exitAnimation is true, it means a link was clicked and we should animate out
  useEffect(() => {
    if (exitAnimation) {
      setIsAnimating(true);
    }
  }, [exitAnimation, setIsAnimating]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
