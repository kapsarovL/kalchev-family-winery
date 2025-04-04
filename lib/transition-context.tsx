import React, { createContext, useContext, useState } from "react";

type TransitionContextType = {
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
  previousPath: string;
  setPreviousPath: (path: string) => void;
  exitAnimation: boolean;
  setExitAnimation: (exit: boolean) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousPath, setPreviousPath] = useState("/");
  const [exitAnimation, setExitAnimation] = useState(false);

  return (
    <TransitionContext.Provider
      value={{
        isAnimating,
        setIsAnimating,
        previousPath,
        setPreviousPath,
        exitAnimation,
        setExitAnimation,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error(
      "useTransitionContext must be used within a TransitionProvider"
    );
  }
  return context;
};
