import React from 'react';
import { DietaResponse } from '../types';

interface DietDetailsProps {
  diet: DietaResponse;
}

export const DietDetails: React.FC<DietDetailsProps> = ({ diet }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-green-800 mb-2">Desayuno</h3>
            <p className="text-gray-700">{diet.desayuno}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-green-800 mb-2">Almuerzo</h3>
            <p className="text-gray-700">{diet.almuerzo}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-green-800 mb-2">Cena</h3>
            <p className="text-gray-700">{diet.cena}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-green-800 mb-2">Snacks</h3>
            <p className="text-gray-700">{diet.snacks}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">Análisis Nutricional</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(diet.analisis_nutricional).map(([key, value]) => (
            <div key={key} className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 capitalize">{key}</p>
              <p className="font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
