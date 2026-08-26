'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { resources } from '@/lib/i18n';

export default function Admin() {
  const { language, deliveries, setDeliveries, couriers, setCouriers } = useStore();
  const t = resources[language].translation;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [deliveriesRes, couriersRes] = await Promise.all([
          fetch('/api/deliveries'),
          fetch('/api/couriers')
        ]);
        const deliveriesData = await deliveriesRes.json();
        const couriersData = await couriersRes.json();

        setDeliveries(deliveriesData);
        setCouriers(couriersData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setDeliveries, setCouriers]);

  const totalDeliveries = deliveries.length;
  const totalRevenue = deliveries.reduce((sum, d) => sum + (d.cost || 0), 0);
  const activeBusinesses = 8;
  const commissionRate = 0.15;
  const totalCommission = totalRevenue * commissionRate;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Admin Panel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Total Deliveries
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalDeliveries}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalRevenue.toLocaleString()} UZS</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Platform Commission
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalCommission.toLocaleString()} UZS</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Active Businesses
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{activeBusinesses}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Courier Services
          </h3>
          <div className="space-y-4">
            {couriers.map((courier) => (
              <div key={courier.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{courier.logo}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{courier.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Base: {courier.basePrice.toLocaleString()} UZS</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">⭐ {courier.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Deliveries
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {deliveries.slice(0, 10).map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">#{delivery.id}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.dropoffAddress}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{delivery.cost.toLocaleString()} UZS</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{delivery.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
