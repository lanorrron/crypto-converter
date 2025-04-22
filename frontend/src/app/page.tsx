import { TopGainersCoins } from '@/modules/analytics/ui/TopGainersCoins';
import { TopPupularCoins } from '@/modules/analytics/ui/TopPopularCoins';
import { PreviewConverter } from '@/modules/convert/ui/PreviewConverter';
import { Coins } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-card">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      <div className="relative">
        {/* Hero Section */}
        <header className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse bg-cyan-500 rounded-full blur-xl opacity-20"></div>
              <Coins className="w-16 h-16 text-cyan-400 relative z-10" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400">
            Sam Crypto
          </h1>
          <p className="text-xl text-cyan-200 mb-8">
            Tu espacio para cotizar y seguir el pulso del mercado cripto.
          </p>
        </header>
        <section className="container mx-auto px-4 py-8">
          <PreviewConverter></PreviewConverter>
        </section>
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TopPupularCoins />
            <TopGainersCoins />
            <TopPupularCoins />
          </div>
        </section>
        <footer className="container mx-auto px-4 py-8 text-center text-cyan-300">
          <p>&copy; 2024 Sam Crypto. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
