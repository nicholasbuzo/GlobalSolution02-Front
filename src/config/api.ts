export const API_CONFIG = {
  OPENWEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  OPENWEATHER_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '',
  DISASTER_API_BASE_URL: 'http://localhost:8080/api',
  DISASTER_API_KEY: process.env.NEXT_PUBLIC_DISASTER_API_KEY,
  
  NASA_API_KEY: 'yNlezKTGYP0HpR39RGxctkRcc6HG0gmOj8QUCN2N',
  NASA_EONET_BASE_URL: 'https://eonet.gsfc.nasa.gov/api/v3',
  
  GDACS_BASE_URL: 'https://www.gdacs.org/xml/rss.xml',
};

// Validação das configurações
if (!API_CONFIG.OPENWEATHER_API_KEY) {
  console.warn('OpenWeather API key is not configured. Weather features will not work.');
}

if (!API_CONFIG.DISASTER_API_KEY) {
  console.warn('Disaster API key is not configured. Disaster features will not work.');
} 