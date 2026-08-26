'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { resources } from '@/lib/i18n';

export default function Dashboard() {
  const { language, deliveries, setDeliveries } = useStore();
  const t = resources[language].translation;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeliveries() {
      try {
        const response = await fetch('/api/deliveries');
        const data = await response.json();
        setDeliveries(data);
      } catch (error) {
        console.error('Failed to fetch deliveries:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDeliveries();
  }, [setDeliveries]);

  const today = new Date().toISOString().split('T')[0];
  const todayDeliveries = deliveries.filter(d => d.createdAt.startsWith(today));

  const totalDeliveries = todayDeliveries.length;
  const inProgress = todayDeliveries.filter(d => d.status === 'in_transit').length;
  const delivered = todayDeliveries.filter(d => d.status === 'delivered').length;
  const totalCost = todayDeliveries.reduce((sum, d) => sum + d.cost, 0);
  const avgCost = totalDeliveries > 0 ? Math.round(totalCost / totalDeliveries) : 0;

  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = deliveries.filter(d => d.createdAt.startsWith(dateStr)).length;
    last7Days.push({
      date: date.toLocaleDateString('uz-UZ', { weekday: 'short' }),
      count
    });
  }

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
        {t.dashboard.title}
      </h1>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">AI tavsiyasi</h3>
            <p className="text-white/90">
              Chorshanba kunlari Uzum Tezkor 20% arzonroq. Agar iloji bo'lsa, katta buyurtmalarni shu kunga qoldiring.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            {t.dashboard.todayDeliveries}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalDeliveries}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            {t.dashboard.inProgress}
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{inProgress}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            {t.dashboard.delivered}
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{delivered}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            {t.dashboard.totalCost}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalCost.toLocaleString()} UZS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {t.dashboard.avgCost}
          </h3>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">{avgCost.toLocaleString()} UZS</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {t.dashboard.last7Days}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Deliveries
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">ID</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Address</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.slice(0, 5).map((delivery) => (
                <tr key={delivery.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">#{delivery.id}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{delivery.dropoffAddress}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      delivery.status === 'delivered'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : delivery.status === 'in_transit'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {delivery.status === 'delivered' ? t.deliveries.delivered :
                       delivery.status === 'in_transit' ? t.deliveries.inTransit :
                       t.deliveries.pending}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{delivery.cost.toLocaleString()} UZS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
