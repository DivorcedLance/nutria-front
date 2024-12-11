import React, { useState } from 'react';
import { DietDetails } from './DietDetails';
import { Save } from 'lucide-react';
import { DietaResponse } from '../types';

interface Props {
  diet: DietaResponse;
  onSave: () => void;
}

export const DietDisplay: React.FC<Props> = ({ diet, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!isSaved) {
      onSave();
      setIsSaved(true);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tu dieta personalizada</h2>
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            isSaved
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <Save className="w-4 h-4" />
          {isSaved ? 'Guardado' : 'Guardar'}
        </button>
      </div>
      <DietDetails diet={diet} />
    </div>
  );
};
