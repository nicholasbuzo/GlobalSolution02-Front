'use client';

import { useState, useEffect } from 'react';
import { getAlerts } from '@/services/alertService';
import { getWeatherData } from '@/services/weatherService';
import DynamicMap from '@/components/DynamicMap';
import { BRAZILIAN_STATES } from '@/services/alertService';
import type { WeatherData } from '@/services/weatherService';
import type { Alert } from '@/services/alertService';

export default function Home() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alertsData = await getAlerts();
        setAlerts(alertsData);
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
      } finally {
        setAlertsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWeatherSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchLocation) return;

    try {
      const data = await getWeatherData(searchLocation);
      setWeatherData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesState = !selectedState || alert.state === selectedState;
    const matchesSeverity = !selectedSeverity || alert.severity === selectedSeverity;
    return matchesState && matchesSeverity;
  });

  const formatNumber = (num: number) => {
    return Math.round(num).toString();
  };

  const getAlertTypeTranslation = (type: string) => {
    switch (type) {
      case 'rain':
        return 'Chuva Intensa';
      case 'heat':
        return 'Calor Extremo';
      case 'air':
        return 'Qualidade do Ar';
      case 'storm':
        return 'Tempestade';
      default:
        return type;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Monitoramento de Alertas Climáticos</h1>

        {/* Filtros */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por Estado
              </label>
              <select
                id="stateFilter"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos os Estados</option>
                {BRAZILIAN_STATES.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="severityFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por Nível de Risco
              </label>
              <select
                id="severityFilter"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos os Níveis</option>
                <option value="high">Alto Risco</option>
                <option value="medium">Médio Risco</option>
                <option value="low">Baixo Risco</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mapa e Alertas lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mapa de Alertas */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Mapa de Alertas</h2>
            <div className="h-[600px] rounded-lg overflow-hidden">
              <DynamicMap
                events={filteredAlerts.map((alert) => ({
                  id: alert.id,
                  title: getAlertTypeTranslation(alert.type),
                  description: alert.description,
                  category: getAlertTypeTranslation(alert.type),
                  severity: alert.severity === 'high' ? 'high' :
                           alert.severity === 'medium' ? 'medium' : 'low',
                  date: alert.date,
                  coordinates: [alert.coordinates[0], alert.coordinates[1]]
                }))}
              />
            </div>
          </div>

          {/* Alertas Climáticos Ativos */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Alertas Climáticos Ativos</h2>
            {alertsLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Carregando alertas...</p>
              </div>
            ) : filteredAlerts.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Nenhum alerta climático ativo no momento.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg shadow-sm border-l-4 ${
                      alert.severity === 'high'
                        ? 'border-red-500 bg-red-50'
                        : alert.severity === 'medium'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {alert.type === 'rain' && '🌧️ Chuva Intensa'}
                          {alert.type === 'heat' && '🌡️ Calor Extremo'}
                          {alert.type === 'air' && '😷 Qualidade do Ar'}
                          {alert.type === 'storm' && '⛈️ Tempestade'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{alert.state}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          alert.severity === 'high'
                            ? 'bg-red-100 text-red-800'
                            : alert.severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {alert.severity === 'high'
                          ? 'Alto Risco'
                          : alert.severity === 'medium'
                          ? 'Médio Risco'
                          : 'Baixo Risco'}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(alert.date).toLocaleString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Busca por Estado */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Buscar Condições Climáticas</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleWeatherSearch} className="space-y-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  id="state"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecione um estado</option>
                  {BRAZILIAN_STATES.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Buscar
              </button>
            </form>
          </div>
        </section>

        {/* Condições Climáticas do Estado */}
        {weatherData && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Condições Climáticas - {searchLocation}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Temperatura</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatNumber(weatherData.temperature)}°C
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Umidade</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatNumber(weatherData.humidity)}%
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Velocidade do Vento</h3>
                  <p className="text-2xl font-bold text-yellow-600">
                    {formatNumber(weatherData.windSpeed)} km/h
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Condição</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {weatherData.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
} 