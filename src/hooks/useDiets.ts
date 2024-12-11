import { useState, useEffect } from 'react';
import { SavedDiet } from '../types';

const STORAGE_KEY = 'nutria_saved_diets';

export const useDiets = () => {
  const [savedDiets, setSavedDiets] = useState<SavedDiet[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedDiets(JSON.parse(stored));
    }
  }, []);

  const saveDiet = (diet: SavedDiet) => {
    const newDiets = [diet, ...savedDiets];
    setSavedDiets(newDiets);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDiets));
  };

  const deleteDiet = (id: string) => {
    const newDiets = savedDiets.filter((diet) => diet.id !== id);
    setSavedDiets(newDiets);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDiets));
  };

  return { savedDiets, saveDiet, deleteDiet };
};