'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/store/useStore';
import { Courier } from '@/store/useStore';

export default function NewOrder() {
  const { t } = useTranslation();
  const { couriers, setCouriers, addDelivery } = useStore();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    packageSize: 'small',
    packageWeight: 1,
    urgency: 'standard'
  });
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    async function fetchCouriers() {
      try {
        const response = await fetch('/api/couriers');
        const data = await response.json();
        setCouriers(data);
      } catch (error) {
        console.error('Failed to fetch couriers:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCouriers();
  }, [setCouriers]);

  const calculateDistance = () => {
    return Math.random() * 10 + 2;
  };

  const calculatePrice = (courier: Courier, distance: number, weight: number, urgency: string) => {
    let price = courier.basePrice + (distance * courier.pricePerKm) + (weight * 1000);
    if (urgency === 'express') {
      price *= courier.expressMultiplier;
    }
    return Math.round(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const distance = calculateDistance();
    
    const results = couriers.map(courier => ({
      courier,
      price: calculatePrice(courier, distance, formData.packageWeight, formData.urgency),
      time: courier.avgTime + Math.round(distance * 2),
      distance: distance.toFixed(1)
    }));

    results.sort((a, b) => a.price - b.price);
    setComparisons(results);
    setShowResults(true);
  };

  const handleConfirmOrder = async () => {
    if (selectedCourier === null) return;

    const selected = comparisons.find(c => c.courier.id === selectedCourier);
    if (!selected) return;

    const newDelivery = {
      pickupAddress: formData.pickupAddress,
      pickupLat: 41.3111 + Math.random() * 0.02,
      pickupLng: 69.2797 + Math.random() * 0.02,
      dropoffAddress: formData.dropoffAddress,
      dropoffLat: 41.3150 + Math.random() * 0.02,
      dropoffLng: 69.2850 + Math.random() * 0.02,
      packageSize: formData.packageSize,
      packageWeight: formData.packageWeight,
      urgency: formData.urgency,
      courierId: selectedCourier,
      status: 'pending' as const,
      cost: selected.price,
      estimatedTime: selected.time,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDelivery)
      });

      if (response.ok) {
        const created = await response.json();
        addDelivery(created);
        setShowResults(false);
        setFormData({
          pickupAddress: '',
          dropoffAddress: '',
          packageSize: 'small',
          packageWeight: 1,
          urgency: 'standard'
        });
        setSelectedCourier(null);
        alert(t('common.success'));
      }
    } catch (error) {
      console.error('Failed to create delivery:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-300">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t('newOrder.title')}
      </h1>

      {!showResults ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('newOrder.pickupAddress')}
              </label>
              <input
                type="text"
                required
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Toshkent, Amir Temur ko'chasi, 15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('newOrder.dropoffAddress')}
              </label>
              <input
                type="text"
                required
                value={formData.dropoffAddress}
                onChange={(e) => setFormData({ ...formData, dropoffAddress: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Toshkent, Bunyodkor ko'chasi, 23"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('newOrder.packageSize')}
                </label>
                <select
                  value={formData.packageSize}
                  onChange={(e) => setFormData({ ...formData, packageSize: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('newOrder.packageWeight')} (kg)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  required
                  value={formData.packageWeight}
                  onChange={(e) => setFormData({ ...formData, packageWeight: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('newOrder.urgency')}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="standard"
                    checked={formData.urgency === 'standard'}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="mr-2"
                  />
                  {t('newOrder.standard')}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="express"
                    checked={formData.urgency === 'express'}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="mr-2"
                  />
                  {t('newOrder.express')}
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('newOrder.comparing')}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t('newOrder.selectCourier')}
            </h2>
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div
                  key={item.courier.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCourier === item.courier.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedCourier(item.courier.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{item.courier.logo}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.courier.name}
                          {index === 0 && (
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-200">
                              {t('newOrder.recommended')}
                            </span>
                          )}
                        </h3>
                        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>⭐ {item.courier.rating}</span>
                          <span>📍 {item.distance} km</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.price.toLocaleString()} UZS
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.time} {t('newOrder.time')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowResults(false)}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleConfirmOrder}
              disabled={selectedCourier === null}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {t('newOrder.submit')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}