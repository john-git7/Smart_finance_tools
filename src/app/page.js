'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Sync with <html> class on mount
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
      setMounted(true);

      // Listen for theme changes in other tabs
      const onStorage = () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme(newTheme);
  };

  if (!mounted) return null; // Prevent hydration mismatch

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
          © {new Date().getFullYear()} SmartFinanceTools.com
        </footer>
      </div>
    </main>
  );
}

function ToolCard({ title, href, description }) {
  return (
    <Link href={href}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition p-6 rounded-2xl cursor-pointer h-full">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-2">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </Link>
  );
}