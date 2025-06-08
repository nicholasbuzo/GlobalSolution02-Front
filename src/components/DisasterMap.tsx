'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DisasterEvent } from '@/services/disasterService';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface DisasterMapProps {
  events: DisasterEvent[];
}

export default function DisasterMap({ events }: DisasterMapProps) {
  const mapRef = useRef<L.Map>(null);

  // Função para determinar a cor do marcador baseado na severidade
  const getMarkerIcon = (severity: string) => {
    const color = severity === 'high' ? 'red' :
                 severity === 'medium' ? 'orange' : 'green';

    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

  // Ajustar o mapa para mostrar todos os marcadores
  useEffect(() => {
    if (mapRef.current && events.length > 0) {
      const bounds = L.latLngBounds(events.map(event => event.coordinates));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [events]);

  if (!events || events.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Nenhum evento de desastre encontrado</p>
      </div>
    );
  }

  return (
    <div className="h-[500px] rounded-lg overflow-hidden">
      <MapContainer
        center={[-23.5505, -46.6333]} // São Paulo
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map((event) => {
          // Verificar se as coordenadas são válidas
          if (!event.coordinates || !Array.isArray(event.coordinates) || event.coordinates.length !== 2) {
            console.warn('Coordenadas inválidas para o evento:', event);
            return null;
          }

          const [lat, lng] = event.coordinates;
          
          // Verificar se as coordenadas são números válidos
          if (typeof lat !== 'number' || typeof lng !== 'number' || 
              isNaN(lat) || isNaN(lng) ||
              lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            console.warn('Coordenadas fora dos limites para o evento:', event);
            return null;
          }

          return (
            <Marker
              key={event.id}
              position={[lat, lng]}
              icon={getMarkerIcon(event.severity)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Categoria:</span> {event.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Severidade:</span> {
                      event.severity === 'high' ? 'Alta' :
                      event.severity === 'medium' ? 'Média' : 'Baixa'
                    }
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Data:</span> {
                      new Date(event.date).toLocaleDateString('pt-BR')
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    {event.description}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
} 