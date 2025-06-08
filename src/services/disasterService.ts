import { API_CONFIG } from '@/config/api';

export interface DisasterEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  coordinates: [number, number]; // [latitude, longitude]
}

interface EONETCategory {
  id: string;
  title: string;
}

interface EONETGeometry {
  date: string;
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface EONETEvent {
  id: string;
  title: string;
  description: string;
  categories: EONETCategory[];
  geometry: EONETGeometry[];
  sources: { url: string }[];
}

interface EONETResponse {
  events: EONETEvent[];
}

// Função para determinar a severidade baseada no tipo de desastre
const determineSeverity = (category: string): 'low' | 'medium' | 'high' => {
  const highSeverity = ['wildfires', 'volcanoes', 'severeStorms', 'floods'];
  const mediumSeverity = ['earthquakes', 'drought', 'landslides'];
  
  if (highSeverity.includes(category)) return 'high';
  if (mediumSeverity.includes(category)) return 'medium';
  return 'low';
};

export async function getDisasterEvents(): Promise<DisasterEvent[]> {
  try {
    console.log('Iniciando busca de eventos de desastres...');
    const response = await fetch(
      `${API_CONFIG.NASA_EONET_BASE_URL}/events?api_key=${API_CONFIG.NASA_API_KEY}&status=open&limit=50`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json() as EONETResponse;
    console.log('Dados recebidos da API:', data);

    // Mapear todos os eventos, sem filtrar por região
    const events = data.events
      .filter((event: EONETEvent) => {
        // Verificar se o evento tem geometria
        return event.geometry && event.geometry.length > 0;
      })
      .map((event: EONETEvent): DisasterEvent => ({
        id: event.id,
        title: event.title,
        description: event.description || 'Sem descrição disponível',
        category: event.categories[0]?.title || 'Desastre Natural',
        severity: determineSeverity(event.categories[0]?.id || ''),
        date: event.geometry[0].date,
        coordinates: [event.geometry[0].coordinates[1], event.geometry[0].coordinates[0]] as [number, number]
      }));

    console.log('Eventos mapeados:', events);
    return events;
  } catch (error) {
    console.error('Erro ao buscar eventos de desastres:', error);
    // Retornar dados de exemplo em caso de erro
    return [
      {
        id: '1',
        title: 'Enchente em São Paulo',
        description: 'Enchente causada por chuvas intensas na região metropolitana de São Paulo',
        category: 'Enchente',
        severity: 'high',
        date: new Date().toISOString(),
        coordinates: [-23.5505, -46.6333] as [number, number]
      },
      {
        id: '2',
        title: 'Deslizamento no Rio de Janeiro',
        description: 'Deslizamento de terra em área de risco no Rio de Janeiro',
        category: 'Deslizamento',
        severity: 'high',
        date: new Date().toISOString(),
        coordinates: [-22.9068, -43.1729] as [number, number]
      },
      {
        id: '3',
        title: 'Seca no Nordeste',
        description: 'Período de seca prolongada na região Nordeste do Brasil',
        category: 'Seca',
        severity: 'medium',
        date: new Date().toISOString(),
        coordinates: [-8.0476, -34.8770] as [number, number]
      }
    ];
  }
}

export async function getDisasterEventsByCategory(category: string): Promise<DisasterEvent[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.NASA_EONET_BASE_URL}/events?api_key=${API_CONFIG.NASA_API_KEY}&status=open&category=${category}&limit=20`
    );

    if (!response.ok) {
      throw new Error('Falha ao obter eventos de desastres por categoria');
    }

    const data = await response.json();
    
    return data.events.map((event: EONETEvent) => ({
      id: event.id,
      title: event.title,
      description: event.description || 'Sem descrição disponível',
      category: event.categories[0].title,
      severity: determineSeverity(event.categories[0].title),
      coordinates: {
        lat: event.geometry[0].coordinates[1],
        lng: event.geometry[0].coordinates[0],
      },
      date: new Date(event.geometry[0].date).toISOString(),
      source: event.sources[0].url,
    }));
  } catch (error) {
    console.error('Erro ao buscar eventos de desastres por categoria:', error);
    throw error;
  }
} 