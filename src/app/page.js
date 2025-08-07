'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-black py-16 px-6 sm:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        

       <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-4">
  Smart Finance Tools
</h1>
<h2 className="text-xl text-slate-600 dark:text-slate-300 mb-10">
  Calculate mortgage, investments, savings goals & retirement.
</h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ToolCard
            title="🏠 Mortgage Calculator"
            href="/mortgage-calculator"
            description="Estimate your monthly mortgage payments."
          />
          <ToolCard
            title="📈 Investment Calculator"
            href="/investment-calculator"
            description="Forecast the future value of your investments."
          />
          <ToolCard
            title="🎯 Savings Goal Calculator"
            href="/savings-goal-calculator"
            description="Find how much to save each month."
          />
          <ToolCard
            title="🧓 Retirement Calculator"
            href="/retirement-calculator"
            description="Plan how much you need to retire comfortably."
          />
        </div>

        <footer className="text-center text-gray-400 dark:text-gray-500 mt-16 text-sm">
          © {new Date().getFullYear()} SmartFinanceTools
        </footer>
      </div>
    </main>
  );
}

function ToolCard({ title, href, description }) {
  return (
    <Link href={href}>
      <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 p-6 rounded-2xl cursor-pointer h-full shadow-sm hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] hover:border-purple-500 dark:hover:border-purple-400">

        {/* Subtle purple glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 blur-md bg-purple-400/10 dark:bg-purple-500/10"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
            {title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {description}
          </p>
        </div>

      </div>
    </Link>
  );
}



