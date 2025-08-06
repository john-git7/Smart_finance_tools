'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [error, setError] = useState('');

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  const calculateMortgage = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount);
    const annualInterest = parseFloat(interestRate) / 100;
    const numberOfPayments = parseFloat(loanTerm) * 12;
    const monthlyInterest = annualInterest / 12;

    if (
      isNaN(principal) ||
      isNaN(annualInterest) ||
      isNaN(numberOfPayments) ||
      principal <= 0 ||
      annualInterest < 0 ||
      numberOfPayments <= 0
    ) {
      setError('Please enter valid positive numbers for all fields.');
      setMonthlyPayment(null);
      return;
    }

    setError('');
    const x = Math.pow(1 + monthlyInterest, numberOfPayments);
    const monthly = (principal * x * monthlyInterest) / (x - 1);
    setMonthlyPayment(monthly);
  };

  return (
    <>
      <Head>
        <title>Mortgage Calculator - Smart Finance Tools</title>
        <meta
          name="description"
          content="Estimate your monthly mortgage payments with SmartFinanceTools.com's Mortgage Calculator."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-xl mx-auto  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-500/5">
          <h1 className="text-4xl font-bold text-center  dark:text-blue-500 mb-6">
            🏠 Mortgage Calculator
          </h1>

          <form onSubmit={calculateMortgage} className="space-y-5">
            <div>
              <label
                htmlFor="loanAmount"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Loan Amount ($)
              </label>
              <input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="interestRate"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Interest Rate (%)
              </label>
              <input
                id="interestRate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="loanTerm"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Loan Term (Years)
              </label>
              <input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
              />
            </div>
          <button
          type="submit"
          className="relative w-full text-blue-600 border-2 border-blue-600 px-5 py-2.5 text-[17px] font-medium bg-transparent overflow-hidden 
                    rounded-2xl transition-all duration-300 ease-in-out transform 
                    hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
        >
          <span
            className="absolute top-0 left-[-40px] h-full w-0 skew-x-[45deg] bg-blue-600 z-0 
                      transition-all duration-200 group-hover:w-[160%] group-active:w-[160%]"
          />
          <span className="relative z-10 transition-colors duration-200 group-hover:text-white group-active:text-white">
            Calculate
          </span>
        </button>

          </form>

          {error && (
            <p className="mt-4 text-red-600 dark:text-red-400 text-center text-sm">{error}</p>
          )}

          {monthlyPayment && (
            <div className="mt-6 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-900 dark:text-green-100 px-4 py-3 rounded-xl text-center text-lg font-bold transition transform hover:scale-[1.02] hover:shadow-md">
              Estimated Monthly Payment: {formatCurrency(monthlyPayment)}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/">
           <button className="relative inline-block text-blue-600 border-2 border-blue-600 px-5 py-2.5 text-[17px] font-medium bg-transparent overflow-hidden 
             rounded-2xl transition-all duration-300 ease-in-out transform 
             hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group">
              <span className="absolute top-0 left-[-40px] h-full w-0 skew-x-[45deg] bg-blue-600 z-0 transition-all duration-200 group-hover:w-[160%] group-active:w-[160%]"/>
              <span className="relative z-10 transition-colors duration-200 group-hover:text-white group-active:text-white">
                Go Back
              </span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
