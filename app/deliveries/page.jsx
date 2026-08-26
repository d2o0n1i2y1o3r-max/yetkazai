'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { resources } from '@/lib/i18n';

export default function Deliveries() {
  const { language, deliveries, setDeliveries, updateDeliveryStatus, couriers, setCouriers } = useStore();
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

  const handleAdvanceStatus = async (delivery) => {
    let newStatus;

    if (delivery.status === 'pending') {
      newStatus = 'in_transit';
    } else if (delivery.status === 'in_transit') {
      newStatus = 'delivered';
    } else {
      return;
    }

    try {
      const response = await fetch(`/api/deliveries/${delivery.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        updateDeliveryStatus(delivery.id, newStatus);
      }
    } catch (error) {
      console.error('Failed to update delivery status:', error);
    }
  };

  const getCourierName = (courierId) => {
    const courier = couriers.find(c => c.id === courierId);
    return courier ? `${courier.logo} ${courier.name}` : 'Unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return t.deliveries.delivered;
      case 'in_transit':
        return t.deliveries.inTransit;
      default:
        return t.deliveries.pending;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-300">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t.deliveries.title}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">ID</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">{t.deliveries.courier}</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Pickup</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">{t.deliveries.status}</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">{t.deliveries.cost}</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">{t.deliveries.time}</th>
                <th className="text-left py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No deliveries found
                  </td>
                </tr>
              ) : (
                deliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">
                      #{delivery.id}
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                      {getCourierName(delivery.courierId)}
                    </td>
                   
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300 text-sm">
                      {delivery.dropoffAddress}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                        {getStatusText(delivery.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">
                      {delivery.cost.toLocaleString()} UZS
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                      {delivery.estimatedTime} min
                    </td>
                    <td className="py-4 px-6">
                      {delivery.status !== 'delivered' && (
                        <button
                          onClick={() => handleAdvanceStatus(delivery)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {t.deliveries.advanceStatus}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Total Deliveries
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{deliveries.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Active Deliveries
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {deliveries.filter(d => d.status !== 'delivered').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {deliveries.reduce((sum, d) => sum + d.cost, 0).toLocaleString()} UZS
          </p>
        </div>
      </div>
    </div>
  );
}
