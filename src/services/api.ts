import { DietaRequest, DietaResponse } from '../types';

const API_URL = 'http://localhost:8000';

export const generateDiet = async (data: DietaRequest): Promise<DietaResponse> => {
  const response = await fetch(`${API_URL}/api/generar_dieta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to generate diet');
  }

  return response.json();
};