import { useState, useCallback } from 'react';
import { initialOnboardingProgress } from '../data/mockData';

export const useProgress = () => {
  const [onboardingProgress, setOnboardingProgress] = useState(initialOnboardingProgress);

  const toggleProgressItem = useCallback((key) => {
    setOnboardingProgress(prev => ({
      ...prev,
      [key]: {
        completed: !prev[key].completed,
        completedAt: !prev[key].completed ? new Date().toISOString().split('T')[0] : null
      }
    }));
  }, []);

  return {
    onboardingProgress,
    toggleProgressItem
  };
};
