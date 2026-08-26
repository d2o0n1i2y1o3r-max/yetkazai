import { create } from 'zustand';

export const useStore = create((set) => ({
  language: 'uz',
  darkMode: typeof window !== 'undefined' ? localStorage.getItem('theme') === 'dark' : false,
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