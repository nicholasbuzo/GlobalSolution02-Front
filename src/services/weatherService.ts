import { API_CONFIG } from '@/config/api';
import { BRAZILIAN_STATES } from './alertService';

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  description: string;
  visibility: number;
  clouds: number;
  sunrise: string;
  sunset: string;
  precipitation: number;
  icon: string;
}

export interface Alert {
  id: string;
  state: string;
  type: 'rain' | 'heat' | 'air' | 'storm';
  severity: 'low' | 'medium' | 'high';
  description: string;
  date: string;
  coordinates: [number, number];
}

const ALERT_THRESHOLDS = {
  rain: {
    heavy: 50,    // 50 mm/h
    veryHeavy: 100, // 100 mm/h
    extreme: 150   // 150 mm/h
  },
  heat: {
    caution: 30,   // 30°C
    warning: 35,   // 35°C
    danger: 40     // 40°C
  },
  air: {
    moderate: 50,     // 50 µg/m³
    unhealthy: 100,   // 100 µg/m³
    veryUnhealthy: 150 // 150 µg/m³
  },
  wind: {
    strong: 60,      // 60 km/h
    veryStrong: 80,  // 80 km/h
    extreme: 100     // 100 km/h
  }
};

const ALERT_MESSAGES = {
  rain: {
    heavy: 'Chuva forte com intensidade de {value} mm/h',
    veryHeavy: 'Chuva muito forte com intensidade de {value} mm/h',
    extreme: 'Chuva extrema com intensidade de {value} mm/h'
  },
  heat: {
    caution: 'Temperatura elevada de {value}°C',
    warning: 'Temperatura muito elevada de {value}°C',
    danger: 'Temperatura extrema de {value}°C'
  },
  air: {
    moderate: 'Qualidade do ar moderada: {value} µg/m³',
    unhealthy: 'Qualidade do ar não saudável: {value} µg/m³',
    veryUnhealthy: 'Qualidade do ar muito não saudável: {value} µg/m³'
  },
  wind: {
    strong: 'Ventos fortes de {value} km/h',
    veryStrong: 'Ventos muito fortes de {value} km/h',
    extreme: 'Ventos extremos de {value} km/h'
  }
};

interface OpenWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  visibility: number;
  clouds: {
    all: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  rain?: {
    '1h': number;
  };
}

// Cache para dados do clima
const weatherCache = new Map<string, { data: OpenWeatherResponse; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

function generateAlertId(state: string, type: string, value: number): string {
  // Criando um ID estável baseado no estado, tipo e valor
  return `${state.toLowerCase().replace(/\s+/g, '-')}-${type}-${value}`;
}

function getAlertSeverity(value: number, thresholds: Record<string, number>): 'low' | 'medium' | 'high' {
  const values = Object.values(thresholds).sort((a, b) => a - b);
  if (value >= values[2]) return 'high';
  if (value >= values[1]) return 'medium';
  return 'low';
}

function formatAlertMessage(type: keyof typeof ALERT_MESSAGES, severity: string, value: number): string {
  const messageTemplate = ALERT_MESSAGES[type][severity as keyof (typeof ALERT_MESSAGES)[typeof type]] as string;
  return messageTemplate.replace('{value}', value.toString());
}

function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

async function getWeatherDataWithCache(state: { name: string; lat: number; lon: number }): Promise<OpenWeatherResponse> {
  const cacheKey = `${state.name}-${state.lat}-${state.lon}`;
  const cached = weatherCache.get(cacheKey);

  // Se temos dados em cache e eles não expiraram, retornamos eles
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Se não temos cache ou ele expirou, buscamos novos dados
  const response = await fetch(
    `${API_CONFIG.OPENWEATHER_BASE_URL}/weather?lat=${state.lat}&lon=${state.lon}&appid=${API_CONFIG.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar dados do clima');
  }

  const data = await response.json() as OpenWeatherResponse;
  
  // Atualizamos o cache
  weatherCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });

  return data;
}

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    const state = BRAZILIAN_STATES.find(s => s.name === location);
    if (!state) {
      throw new Error('Estado não encontrado');
    }

    const data = await getWeatherDataWithCache(state);

    return {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      humidity: Math.round(data.main.humidity),
      pressure: Math.round(data.main.pressure),
      windSpeed: Math.round(data.wind.speed),
      windDirection: getWindDirection(data.wind.deg),
      description: data.weather[0].description,
      visibility: Math.round(data.visibility / 1000),
      clouds: Math.round(data.clouds.all),
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('pt-BR'),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('pt-BR'),
      precipitation: Math.round(data.rain ? data.rain['1h'] || 0 : 0),
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    throw error;
  }
}

export async function getAlerts(): Promise<Alert[]> {
  try {
    const alerts: Alert[] = [];

    // Buscar dados do clima para cada estado
    for (const state of BRAZILIAN_STATES) {
      try {
        const data = await getWeatherDataWithCache(state);

        // Verificar chuva
        const rainIntensity = Math.round(data.rain ? data.rain['1h'] || 0 : 0);
        if (rainIntensity >= ALERT_THRESHOLDS.rain.heavy) {
          const severity = getAlertSeverity(rainIntensity, ALERT_THRESHOLDS.rain);
          const severityKey = (severity === 'high' ? 'extreme' : 
                            severity === 'medium' ? 'veryHeavy' : 'heavy');
          
          alerts.push({
            id: generateAlertId(state.name, 'rain', rainIntensity),
            state: state.name,
            type: 'rain',
            severity,
            description: formatAlertMessage('rain', severityKey, rainIntensity),
            date: new Date().toISOString(),
            coordinates: [Math.round(state.lat), Math.round(state.lon)]
          });
        }

        // Verificar calor
        const temperature = Math.round(data.main.temp);
        if (temperature >= ALERT_THRESHOLDS.heat.caution) {
          const severity = getAlertSeverity(temperature, ALERT_THRESHOLDS.heat);
          const severityKey = (severity === 'high' ? 'danger' : 
                            severity === 'medium' ? 'warning' : 'caution');
          
          alerts.push({
            id: generateAlertId(state.name, 'heat', temperature),
            state: state.name,
            type: 'heat',
            severity,
            description: formatAlertMessage('heat', severityKey, temperature),
            date: new Date().toISOString(),
            coordinates: [Math.round(state.lat), Math.round(state.lon)]
          });
        }

        // Verificar ventos fortes
        const windSpeed = Math.round(data.wind.speed);
        if (windSpeed >= ALERT_THRESHOLDS.wind.strong) {
          const severity = getAlertSeverity(windSpeed, ALERT_THRESHOLDS.wind);
          const severityKey = (severity === 'high' ? 'extreme' : 
                            severity === 'medium' ? 'veryStrong' : 'strong');
          
          alerts.push({
            id: generateAlertId(state.name, 'storm', windSpeed),
            state: state.name,
            type: 'storm',
            severity,
            description: formatAlertMessage('wind', severityKey, windSpeed),
            date: new Date().toISOString(),
            coordinates: [Math.round(state.lat), Math.round(state.lon)]
          });
        }

        // Verificar qualidade do ar (usando umidade como proxy)
        const humidity = Math.round(data.main.humidity);
        if (humidity >= ALERT_THRESHOLDS.air.moderate) {
          const severity = getAlertSeverity(humidity, ALERT_THRESHOLDS.air);
          const severityKey = (severity === 'high' ? 'veryUnhealthy' : 
                            severity === 'medium' ? 'unhealthy' : 'moderate');
          
          alerts.push({
            id: generateAlertId(state.name, 'air', humidity),
            state: state.name,
            type: 'air',
            severity,
            description: formatAlertMessage('air', severityKey, humidity),
            date: new Date().toISOString(),
            coordinates: [Math.round(state.lat), Math.round(state.lon)]
          });
        }
      } catch (error) {
        console.error(`Erro ao processar dados do clima para ${state.name}:`, error);
        continue;
      }
    }

    return alerts;
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return [];
  }
} 