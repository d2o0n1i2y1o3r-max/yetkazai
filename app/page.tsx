'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('landing.heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {t('landing.heroSubtitle')}
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {t('landing.cta')}
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('landing.problem')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('landing.problemText')}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('landing.solution')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('landing.solutionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            {t('landing.howItWorks')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {t('landing.step1')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your delivery details including pickup and drop-off addresses
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {t('landing.step2')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                View real-time comparisons from multiple courier services
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {t('landing.step3')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select the best option based on price, time, and rating
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to optimize your deliveries?
          </h2>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {t('landing.cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}