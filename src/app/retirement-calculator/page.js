"use client";

import React, { useState } from "react";
import Head from "next/head";

export default function RetirementCalculator() {
  const [retirementTarget, setRetirementTarget] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [retirementYears, setRetirementYears] = useState("");
  const [monthlySavings, setMonthlySavings] = useState(null);
  const [error, setError] = useState("");

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const calculateRetirement = (e) => {
    e.preventDefault();
    setError("");

    const target = parseFloat(retirementTarget);
    const current = parseFloat(currentSavings);
    const years = parseFloat(retirementYears);

    if (
      isNaN(target) ||
      isNaN(current) ||
      isNaN(years) ||
      years <= 0 ||
      target < current
    ) {
      setError(
        "Please enter valid numbers. Target should be greater than current savings, and years should be positive."
      );
      setMonthlySavings(null);
      return;
    }

    const months = years * 12;
    const requiredMonthly = (target - current) / months;
    setMonthlySavings(requiredMonthly);
  };

  return (
    <>
      <Head>
        <title>Retirement Calculator - Smart Finance Tools</title>
        <meta
          name="description"
          content="Calculate how much you need to save monthly to reach your retirement goal."
        />
        <meta
          name="keywords"
          content="retirement calculator, monthly retirement savings, smart finance"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-6 sm:p-8">
          <h1 className="text-4xl font-bold text-center text-orange-800 dark:text-orange-300 mb-8">
            🧓 Retirement Calculator
          </h1>

          <form onSubmit={calculateRetirement} className="space-y-6">
            <div>
              <label
                htmlFor="retirementTarget"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Target Retirement Amount ($)
              </label>
              <input
                id="retirementTarget"
                type="number"
                value={retirementTarget}
                onChange={(e) => setRetirementTarget(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="currentSavings"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Current Savings ($)
              </label>
              <input
                id="currentSavings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="retirementYears"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Years Until Retirement
              </label>
              <input
                id="retirementYears"
                type="number"
                value={retirementYears}
                onChange={(e) => setRetirementYears(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-xl shadow-md transition"
            >
              Calculate
            </button>

            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">
                {error}
              </p>
            )}

            {monthlySavings && !error && (
              <div className="mt-6 bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700 text-orange-900 dark:text-orange-100 px-4 py-3 rounded-xl text-center text-lg font-bold">
                You need to save: {formatCurrency(monthlySavings)}/month
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
