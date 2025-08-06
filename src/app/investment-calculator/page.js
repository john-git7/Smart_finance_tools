'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [years, setYears] = useState('');
  const [futureValue, setFutureValue] = useState(null);
  const [error, setError] = useState('');

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  const calculateInvestment = (e) => {
    e.preventDefault();
    const principal = parseFloat(initialInvestment);
    const rate = parseFloat(annualReturn) / 100;
    const time = parseFloat(years);

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      setError('Please enter valid numeric values.');
      setFutureValue(null);
      return;
    }

    setError('');
    const future = principal * Math.pow(1 + rate, time);
    setFutureValue(future);
  };

  return (
    <>
      <Head>
        <title>Investment Calculator - Smart Finance Tools</title>
        <meta
          name="description"
          content="Forecast the future value of your investments with our smart investment calculator."
        />
        <meta
          name="keywords"
          content="investment calculator, compound interest, financial planning"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-green-800 dark:text-green-300 mb-8">
            📈 Investment Calculator
          </h1>

          <form
            onSubmit={calculateInvestment}
            className="space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-6 sm:p-8"
          >
            <div>
              <label
                htmlFor="initialInvestment"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Initial Investment ($)
              </label>
              <input
                id="initialInvestment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="annualReturn"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Annual Return Rate (%)
              </label>
              <input
                id="annualReturn"
                type="number"
                step="0.01"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="years"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Investment Term (Years)
              </label>
              <input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl shadow-md transition"
            >
              Calculate
            </button>

            {error && (
              <p className="text-red-600 mt-2 text-sm text-center">{error}</p>
            )}

            {futureValue && (
              <div className="mt-6 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100 px-4 py-3 rounded-xl text-center text-lg font-bold">
                Future Value: {formatCurrency(futureValue)}
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
