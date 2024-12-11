import React, { useState } from 'react';
import { SavedDiet } from '../types';
import { DietDetails } from './DietDetails';

interface Props {
  diets: SavedDiet[];
  onDelete: (id: string) => void;
}

export const SavedDiets: React.FC<Props> = ({ diets, onDelete }) => {
  const [selectedDiet, setSelectedDiet] = useState<SavedDiet | null>(null);

  const closeModal = () => setSelectedDiet(null);

  if (diets.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Dietas Guardadas</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {diets.map((diet) => (
          <div
            key={diet.id}
            onClick={() => setSelectedDiet(diet)}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(diet.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  IMC: {(diet.request.peso / Math.pow(diet.request.altura / 100, 2)).toFixed(1)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evitar abrir el modal al borrar
                  onDelete(diet.id);
                }}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                🗑️
              </button>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <h4 className="font-semibold text-gray-800">Análisis Nutricional</h4>
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(diet.analisis_nutricional).map(([key, value]) => (
                  <li key={key}>
                    {key}: <span className="font-semibold">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Modal flotante */}
      {selectedDiet && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic dentro del modal
            className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-2xl mx-4 sm:mx-0 h-full sm:h-auto overflow-hidden relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Detalles de la Dieta
            </h2>
            <div className="max-h-[calc(100vh-100px)] sm:max-h-none overflow-y-auto">
              <DietDetails diet={selectedDiet} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
