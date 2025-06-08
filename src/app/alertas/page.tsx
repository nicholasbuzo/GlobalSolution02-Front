'use client';

import { useEffect, useState } from 'react';
import { getDisasterEvents, DisasterEvent } from '@/services/disasterService';
import DynamicMap from '@/components/DynamicMap';

export default function WorldAlerts() {
  const [disasterEvents, setDisasterEvents] = useState<DisasterEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar eventos de desastres
        const events = await getDisasterEvents();
        setDisasterEvents(events);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os dados. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Alertas Ativos */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Alertas Globais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disasterEvents.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">{event.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.severity === 'high' ? 'bg-red-100 text-red-800' :
                    event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {event.severity === 'high' ? 'Alta Severidade' :
                     event.severity === 'medium' ? 'Média Severidade' :
                     'Baixa Severidade'}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{event.category}</p>
                <p className="text-gray-500 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mapa de Desastres */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mapa de Desastres</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <DynamicMap events={disasterEvents} />
          </div>
        </section>
      </div>
    </main>
  );
}
