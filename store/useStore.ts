import { create } from 'zustand';

export interface Courier {
  id: number;
  name: string;
  logo: string;
  basePrice: number;
  pricePerKm: number;
  expressMultiplier: number;
  rating: number;
  avgTime: number;
}

export interface Delivery {
  id: number;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropoffAddress: string;
  dropoffLat: number;
  dropoffLng: number;
  packageSize: string;
  packageWeight: number;
  urgency: string;
  courierId: number;
  status: 'pending' | 'in_transit' | 'delivered';
  cost: number;
  estimatedTime: number;
  createdAt: string;
  deliveredAt?: string;
}

export interface RouteStop {
  id: string;
  address: string;
  lat: number;
  lng: number;
}

interface StoreState {
  language: 'uz' | 'ru' | 'en';
  darkMode: boolean;
  couriers: Courier[];
  deliveries: Delivery[];
  routeStops: RouteStop[];
  pickupLocation: { address: string; lat: number; lng: number } | null;
  
  setLanguage: (lang: 'uz' | 'ru' | 'en') => void;
  toggleDarkMode: () => void;
  setCouriers: (couriers: Courier[]) => void;
  setDeliveries: (deliveries: Delivery[]) => void;
  addDelivery: (delivery: Delivery) => void;
  updateDeliveryStatus: (id: number, status: 'pending' | 'in_transit' | 'delivered') => void;
  setRouteStops: (stops: RouteStop[]) => void;
  addRouteStop: (stop: RouteStop) => void;
  removeRouteStop: (id: string) => void;
  setPickupLocation: (location: { address: string; lat: number; lng: number } | null) => void;
  clearRoute: () => void;
}

export const useStore = create<StoreState>((set) => ({
  language: 'uz',
  darkMode: false,
  couriers: [],
  deliveries: [],
  routeStops: [],
  pickupLocation: null,
  
  setLanguage: (lang) => set({ language: lang }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setCouriers: (couriers) => set({ couriers }),
  setDeliveries: (deliveries) => set({ deliveries }),
  addDelivery: (delivery) => set((state) => ({ deliveries: [...state.deliveries, delivery] })),
  updateDeliveryStatus: (id, status) => set((state) => ({
    deliveries: state.deliveries.map((d) =>
      d.id === id ? { ...d, status } : d
    )
  })),
  setRouteStops: (stops) => set({ routeStops: stops }),
  addRouteStop: (stop) => set((state) => ({ routeStops: [...state.routeStops, stop] })),
  removeRouteStop: (id) => set((state) => ({
    routeStops: state.routeStops.filter((s) => s.id !== id)
  })),
  setPickupLocation: (location) => set({ pickupLocation: location }),
  clearRoute: () => set({ routeStops: [], pickupLocation: null })
}));