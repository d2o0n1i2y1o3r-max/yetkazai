'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pickupIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  stops: Array<{ id: string; address: string; lat: number; lng: number }>;
  pickup: { address: string; lat: number; lng: number } | null;
  optimized: boolean;
}

function MapView({ stops, pickup, optimized }: MapProps) {
  const map = useMap();

  useEffect(() => {
    if (pickup) {
      map.setView([pickup.lat, pickup.lng], 13);
    } else if (stops.length > 0) {
      map.setView([stops[0].lat, stops[0].lng], 13);
    }
  }, [map, pickup, stops]);

  return null;
}

export default function Map({ stops, pickup, optimized }: MapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      <span className="text-gray-600 dark:text-gray-300">Loading map...</span>
    </div>;
  }

  const routePoints = pickup 
    ? [pickup, ...stops].map(s => [s.lat, s.lng] as [number, number])
    : stops.map(s => [s.lat, s.lng] as [number, number]);

  return (
    <MapContainer
      center={[41.3111, 69.2797]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapView stops={stops} pickup={pickup} optimized={optimized} />
      
      {pickup && (
        <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}>
          <Popup>
            <div className="text-sm font-medium">
              <div className="font-bold">📍 Pickup</div>
              <div>{pickup.address}</div>
            </div>
          </Popup>
        </Marker>
      )}
      
      {stops.map((stop, index) => (
        <Marker key={stop.id} position={[stop.lat, stop.lng]} icon={icon}>
          <Popup>
            <div className="text-sm font-medium">
              <div className="font-bold">📦 Stop {index + 1}</div>
              <div>{stop.address}</div>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {optimized && routePoints.length > 1 && (
        <Polyline
          positions={routePoints}
          color="#3b82f6"
          weight={4}
          opacity={0.7}
        />
      )}
    </MapContainer>
  );
}