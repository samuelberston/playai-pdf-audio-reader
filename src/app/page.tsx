'use client';

import MainContent from '@/components/layout/MainContent';
import Footer from '@/components/layout/Footer';

export default function Home() {

  return (
    <div className="flex min-h-screen">
      <main className={`flex-1 transition-all duration-300`}>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <MainContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};
