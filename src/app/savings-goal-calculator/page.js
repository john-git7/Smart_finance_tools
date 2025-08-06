"use client";

import React, { useState } from "react";
import Head from "next/head";

export default function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState("");
  const [years, setYears] = useState("");
  const [monthlySavings, setMonthlySavings] = useState(null);
  const [error, setError] = useState("");

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const calculateSavings = (e) => {
    e.preventDefault();
    setError("");

    const target = parseFloat(targetAmount);
    const duration = parseFloat(years) * 12;

    if (isNaN(target) || target <= 0) {
      return setError("Please enter a valid target amount.");
    }
    if (isNaN(duration) || duration <= 0) {
      return setError("Please enter a valid number of years.");
    }

    const monthly = target / duration;
    setMonthlySavings(monthly);
  };

  return (
    <>
      <Head>
        <title>Savings Goal Calculator | SmartFinanceTools</title>
        <meta
          name="description"
          content="Figure out how much you need to save monthly to reach your financial goal."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-6 sm:p-8">
          <h1 className="text-4xl font-bold text-center text-purple-800 dark:text-purple-300 mb-8">
            🎯 Savings Goal Calculator
          </h1>

          <form onSubmit={calculateSavings} className="space-y-6">
            <div>
              <label
                htmlFor="targetAmount"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Target Amount ($)
              </label>
              <input
                id="targetAmount"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="years"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Time Frame (Years)
              </label>
              <input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-xl shadow-md transition"
            >
              Calculate
            </button>

            {error && (
              <p className="text-red-600 dark:text-red-400 font-medium text-sm text-center">
                {error}
              </p>
            )}

            {monthlySavings && !error && (
              <div className="mt-6 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 px-4 py-3 rounded-xl text-center text-lg font-bold">
                You need to save: {formatCurrency(monthlySavings)}/month
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
