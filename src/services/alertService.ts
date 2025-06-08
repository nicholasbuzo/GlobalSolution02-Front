export interface Alert {
  id: string;
  state: string;
  type: 'rain' | 'storm' | 'heat' | 'air';
  severity: 'low' | 'medium' | 'high';
  description: string;
  date: string;
  coordinates: [number, number];
}

// Valores de referência para alertas
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

// Mensagens padronizadas para cada tipo de alerta
const ALERT_MESSAGES = {
  rain: {
    heavy: 'Chuva forte com acumulado de {value}mm/h. Risco de alagamentos em áreas baixas.',
    veryHeavy: 'Chuva muito forte com acumulado de {value}mm/h. Alto risco de alagamentos e deslizamentos.',
    extreme: 'Chuva extrema com acumulado de {value}mm/h. Risco extremo de alagamentos, deslizamentos e enchentes.',
  },
  heat: {
    caution: 'Temperatura elevada de {value}°C. Mantenha-se hidratado e evite exposição prolongada ao sol.',
    warning: 'Temperatura muito alta de {value}°C. Risco de desidratação e insolação. Evite atividades ao ar livre.',
    danger: 'Temperatura extremamente alta de {value}°C. Risco grave à saúde. Evite sair de casa.',
  },
  air: {
    moderate: 'Qualidade do ar moderada ({value} µg/m³). Pessoas sensíveis devem reduzir atividades ao ar livre.',
    unhealthy: 'Qualidade do ar não saudável ({value} µg/m³). Todos devem reduzir atividades ao ar livre.',
    veryUnhealthy: 'Qualidade do ar muito não saudável ({value} µg/m³). Evite atividades ao ar livre.',
  },
  wind: {
    strong: 'Ventos fortes de {value} km/h. Cuidado com objetos soltos e galhos de árvores.',
    veryStrong: 'Ventos muito fortes de {value} km/h. Alto risco de queda de árvores e objetos.',
    extreme: 'Ventos extremos de {value} km/h. Risco extremo. Mantenha-se em local seguro.',
  }
};

// Estados brasileiros com suas coordenadas aproximadas
export const BRAZILIAN_STATES = [
  { name: 'Acre', lat: -8.77, lon: -70.55 },
  { name: 'Alagoas', lat: -9.71, lon: -35.73 },
  { name: 'Amapá', lat: 1.41, lon: -51.77 },
  { name: 'Amazonas', lat: -3.10, lon: -61.66 },
  { name: 'Bahia', lat: -12.97, lon: -38.50 },
  { name: 'Ceará', lat: -3.73, lon: -38.52 },
  { name: 'Distrito Federal', lat: -15.78, lon: -47.92 },
  { name: 'Espírito Santo', lat: -20.31, lon: -40.30 },
  { name: 'Goiás', lat: -16.64, lon: -49.31 },
  { name: 'Maranhão', lat: -2.55, lon: -44.30 },
  { name: 'Mato Grosso', lat: -15.60, lon: -56.09 },
  { name: 'Mato Grosso do Sul', lat: -20.44, lon: -54.64 },
  { name: 'Minas Gerais', lat: -19.92, lon: -43.93 },
  { name: 'Pará', lat: -1.45, lon: -48.50 },
  { name: 'Paraíba', lat: -7.12, lon: -34.86 },
  { name: 'Paraná', lat: -25.42, lon: -49.27 },
  { name: 'Pernambuco', lat: -8.05, lon: -34.87 },
  { name: 'Piauí', lat: -5.09, lon: -42.80 },
  { name: 'Rio de Janeiro', lat: -22.90, lon: -43.17 },
  { name: 'Rio Grande do Norte', lat: -5.79, lon: -35.20 },
  { name: 'Rio Grande do Sul', lat: -30.03, lon: -51.21 },
  { name: 'Rondônia', lat: -8.76, lon: -63.90 },
  { name: 'Roraima', lat: 2.82, lon: -60.67 },
  { name: 'Santa Catarina', lat: -27.59, lon: -48.54 },
  { name: 'São Paulo', lat: -23.55, lon: -46.63 },
  { name: 'Sergipe', lat: -10.90, lon: -37.07 },
  { name: 'Tocantins', lat: -10.16, lon: -48.33 }
];

type RainSeverity = 'heavy' | 'veryHeavy' | 'extreme';
type HeatSeverity = 'caution' | 'warning' | 'danger';
type AirSeverity = 'moderate' | 'unhealthy' | 'veryUnhealthy';
type WindSeverity = 'strong' | 'veryStrong' | 'extreme';

type AlertSeverity = RainSeverity | HeatSeverity | AirSeverity | WindSeverity;

function generateAlertId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function getAlertSeverity(value: number, thresholds: { [key: string]: number }): 'low' | 'medium' | 'high' {
  if (value >= thresholds.extreme) return 'high';
  if (value >= thresholds.veryHeavy || value >= thresholds.warning || value >= thresholds.unhealthy) return 'medium';
  return 'low';
}

function formatAlertMessage(type: keyof typeof ALERT_MESSAGES, severity: AlertSeverity, value: number): string {
  const messageTemplate = ALERT_MESSAGES[type][severity as keyof (typeof ALERT_MESSAGES)[typeof type]] as string;
  return messageTemplate.replace('{value}', value.toString());
}

export async function getAlerts(): Promise<Alert[]> {
  try {
    const alerts: Alert[] = [];

    // Simular dados de clima para cada estado
    for (const state of BRAZILIAN_STATES) {
      // Gerar valores aleatórios para simulação
      const rainIntensity = Math.round(Math.random() * 200); // 0-200 mm/h
      const temperature = Math.round(20 + Math.random() * 30); // 20-50°C
      const airQuality = Math.round(Math.random() * 200); // 0-200 µg/m³
      const windSpeed = Math.round(Math.random() * 120); // 0-120 km/h

      // Verificar chuva
      if (rainIntensity >= ALERT_THRESHOLDS.rain.heavy) {
        const severity = getAlertSeverity(rainIntensity, ALERT_THRESHOLDS.rain);
        const severityKey = (severity === 'high' ? 'extreme' : 
                          severity === 'medium' ? 'veryHeavy' : 'heavy') as RainSeverity;
        
        alerts.push({
          id: generateAlertId(),
          state: state.name,
          type: 'rain',
          severity,
          description: formatAlertMessage('rain', severityKey, rainIntensity),
          date: new Date().toISOString(),
          coordinates: [Math.round(state.lat), Math.round(state.lon)]
        });
      }

      // Verificar calor
      if (temperature >= ALERT_THRESHOLDS.heat.caution) {
        const severity = getAlertSeverity(temperature, ALERT_THRESHOLDS.heat);
        const severityKey = (severity === 'high' ? 'danger' : 
                          severity === 'medium' ? 'warning' : 'caution') as HeatSeverity;
        
        alerts.push({
          id: generateAlertId(),
          state: state.name,
          type: 'heat',
          severity,
          description: formatAlertMessage('heat', severityKey, temperature),
          date: new Date().toISOString(),
          coordinates: [Math.round(state.lat), Math.round(state.lon)]
        });
      }

      // Verificar qualidade do ar
      if (airQuality >= ALERT_THRESHOLDS.air.moderate) {
        const severity = getAlertSeverity(airQuality, ALERT_THRESHOLDS.air);
        const severityKey = (severity === 'high' ? 'veryUnhealthy' : 
                          severity === 'medium' ? 'unhealthy' : 'moderate') as AirSeverity;
        
        alerts.push({
          id: generateAlertId(),
          state: state.name,
          type: 'air',
          severity,
          description: formatAlertMessage('air', severityKey, airQuality),
          date: new Date().toISOString(),
          coordinates: [Math.round(state.lat), Math.round(state.lon)]
        });
      }

      // Verificar ventos fortes
      if (windSpeed >= ALERT_THRESHOLDS.wind.strong) {
        const severity = getAlertSeverity(windSpeed, ALERT_THRESHOLDS.wind);
        const severityKey = (severity === 'high' ? 'extreme' : 
                          severity === 'medium' ? 'veryStrong' : 'strong') as WindSeverity;
        
        alerts.push({
          id: generateAlertId(),
          state: state.name,
          type: 'storm',
          severity,
          description: formatAlertMessage('wind', severityKey, windSpeed),
          date: new Date().toISOString(),
          coordinates: [Math.round(state.lat), Math.round(state.lon)]
        });
      }
    }

    return alerts;
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return [];
  }
} 