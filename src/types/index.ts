export interface DietaRequest {
  peso: number;
  altura: number;
  sexo: 'masculino' | 'femenino';
  preferencias: string;
}

export interface DietaResponse {
  desayuno: string;
  almuerzo: string;
  cena: string;
  snacks: string;
  analisis_nutricional: {
    [key: string]: number | string;
  };
}

export interface SavedDiet extends DietaResponse {
  id: string;
  date: string;
  request: DietaRequest;
}