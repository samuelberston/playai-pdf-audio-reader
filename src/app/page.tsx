'use client';

import MainContent from '@/components/layout/MainContent';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex h-screen">
      <main className="flex-1">
        <MainContent />
      </main>
      <Footer />
    </div>
  );
};
