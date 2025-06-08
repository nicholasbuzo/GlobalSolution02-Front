'use client';

import dynamic from 'next/dynamic';
import { DisasterEvent } from '@/services/disasterService';

interface DynamicMapProps {
  events: DisasterEvent[];
}

const MapWithNoSSR = dynamic(() => import('./DisasterMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando mapa...</p>
      </div>
    </div>
  ),
});

export default function DynamicMap({ events }: DynamicMapProps) {
  return <MapWithNoSSR events={events} />;
} 