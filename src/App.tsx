import { useState } from 'react';
import { DietForm } from './components/DietForm';
import { DietDisplay } from './components/DietDisplay';
import { SavedDiets } from './components/SavedDiets';
import { generateDiet } from './services/api';
import { useDiets } from './hooks/useDiets';
import { DietaRequest, DietaResponse } from './types';
import { ChefHat } from 'lucide-react';

function App() {
  const [currentDiet, setCurrentDiet] = useState<DietaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { savedDiets, saveDiet, deleteDiet } = useDiets();
  const [activeTab, setActiveTab] = useState<'form' | 'saved'>('form');

  const handleSubmit = async (data: DietaRequest) => {
    try {
      setIsLoading(true);
      const diet = await generateDiet(data);
      setCurrentDiet(diet);
    } catch (error) {
      console.error('Error generating diet:', error);
      alert('Error al generar la dieta. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (currentDiet) {
      saveDiet({
        ...currentDiet,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        request: {
          peso: 70,
          altura: 170,
          sexo: 'masculino',
          preferencias: '',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="NutrIA" className="h-12 w-auto" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">NutrIA</h1>
              <span className="text-sm text-gray-500">Tu asistente de alimentación inteligente</span>
            </div>
          </div>
          <div>
            <ChefHat className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="flex justify-center gap-8 border-b pb-4">
          <button
            className={`text-lg font-medium ${
              activeTab === 'form' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('form')}
          >
            Generar Dieta
          </button>
          <button
            className={`text-lg font-medium ${
              activeTab === 'saved' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('saved')}
          >
            Dietas Guardadas
          </button>
        </div>

        {/* Tabs Content */}
        {activeTab === 'form' && (
          <div className="flex flex-col items-center gap-8">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Tu plan de alimentación personalizado
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Genera un plan de alimentación adaptado a tus necesidades utilizando
                inteligencia artificial.
              </p>
            </div>

            <DietForm onSubmit={handleSubmit} isLoading={isLoading} />

            {currentDiet && <DietDisplay diet={currentDiet} onSave={handleSave} />}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <SavedDiets diets={savedDiets} onDelete={deleteDiet} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
