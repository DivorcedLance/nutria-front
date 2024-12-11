import React, { useState } from 'react';
import { DietaRequest } from '../types';
import { Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (data: DietaRequest) => void;
  isLoading: boolean;
}

export const DietForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<DietaRequest>({
    peso: 70,
    altura: 170,
    sexo: 'masculino',
    preferencias: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleChange = (key: keyof DietaRequest, value: number | string) => {
    setFormData({ ...formData, [key]: value });

    // Validación básica en tiempo real
    if (key === 'peso' && (value as number < 30 || value as number > 200)) {
      setErrors({ ...errors, peso: 'El peso debe estar entre 30 y 200 kg.' });
    } else if (key === 'altura' && (value as number < 100 || value as number > 250)) {
      setErrors({ ...errors, altura: 'La altura debe estar entre 100 y 250 cm.' });
    } else {
      setErrors({ ...errors, [key]: null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto p-4 border border-gray-200 rounded-lg shadow-md bg-white sm:p-6 md:space-y-8"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Generador de Dietas</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Peso */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
          <input
            type="number"
            value={formData.peso}
            onChange={(e) => handleChange('peso', parseFloat(e.target.value))}
            className={`mt-1 block w-full rounded-md border ${
              errors.peso ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:ring-green-500 focus:border-green-500`}
            required
            min="30"
            max="200"
          />
          {errors.peso && <p className="mt-1 text-sm text-red-500">{errors.peso}</p>}
        </div>

        {/* Altura */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Altura (cm)</label>
          <input
            type="number"
            value={formData.altura}
            onChange={(e) => handleChange('altura', parseFloat(e.target.value))}
            className={`mt-1 block w-full rounded-md border ${
              errors.altura ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:ring-green-500 focus:border-green-500`}
            required
            min="100"
            max="250"
          />
          {errors.altura && <p className="mt-1 text-sm text-red-500">{errors.altura}</p>}
        </div>
      </div>

      {/* Sexo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Sexo</label>
        <select
          value={formData.sexo}
          onChange={(e) => handleChange('sexo', e.target.value as 'masculino' | 'femenino')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>

      {/* Preferencias */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Preferencias alimenticias</label>
        <textarea
          value={formData.preferencias}
          onChange={(e) => handleChange('preferencias', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          rows={3}
          placeholder="Ej: vegetariano, sin gluten, alergias..."
        />
      </div>

      {/* Botón de Enviar */}
      <button
        type="submit"
        disabled={isLoading || Object.values(errors).some((error) => error)}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          'Generar Dieta'
        )}
      </button>
    </form>
  );
};
