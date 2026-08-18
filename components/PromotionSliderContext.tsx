"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const PROMOTION_COUNT = 2;
export const SLIDE_DURATION_MS = 6000;

type PromotionSliderContextValue = {
  activePromotion: number;
  setActivePromotion: (index: number) => void;
  showPrevious: () => void;
  showNext: () => void;
};

const PromotionSliderContext =
  createContext<PromotionSliderContextValue | null>(null);

type PromotionSliderProviderProps = {
  children: ReactNode;
};

export function PromotionSliderProvider({
  children,
}: PromotionSliderProviderProps) {
  const [activePromotion, setActivePromotionState] = useState(0);

  const setActivePromotion = useCallback((index: number) => {
    const normalizedIndex =
      ((index % PROMOTION_COUNT) + PROMOTION_COUNT) % PROMOTION_COUNT;

    setActivePromotionState(normalizedIndex);
  }, []);

  const showPrevious = useCallback(() => {
    setActivePromotionState((current) =>
      current === 0 ? PROMOTION_COUNT - 1 : current - 1
    );
  }, []);

  const showNext = useCallback(() => {
    setActivePromotionState((current) =>
      current === PROMOTION_COUNT - 1 ? 0 : current + 1
    );
  }, []);

  useEffect(() => {
    const interval = window.setInterval(showNext, SLIDE_DURATION_MS);
    return () => window.clearInterval(interval);
  }, [showNext]);

  const value = useMemo(
    () => ({
      activePromotion,
      setActivePromotion,
      showPrevious,
      showNext,
    }),
    [activePromotion, setActivePromotion, showPrevious, showNext]
  );

  return (
    <PromotionSliderContext.Provider value={value}>
      {children}
    </PromotionSliderContext.Provider>
  );
}

export function usePromotionSlider() {
  const context = useContext(PromotionSliderContext);

  if (!context) {
    throw new Error(
      "usePromotionSlider must be used inside PromotionSliderProvider"
    );
  }

  return context;
}
