'use client'
import Card from "@/components/Card";
import { getAllPairsToConvert } from "@/modules/convert/service/convert.service";
import { log } from "console";
import { ArrowRightLeft, Bell, Bitcoin, ChevronDown, ChevronUp, Coins, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";



export default function Home() {

  useEffect(()=>{
    const fetchData = async () => {
      const allPairsToConvert = await getAllPairsToConvert();
      // aquí haces algo con allPairsToConvert
      console.log(allPairsToConvert)
  
    };
  
    fetchData();
  },[])
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('1');
  const [email, setEmail] = useState('');

  const popularCoins = [
    { name: 'Bitcoin', symbol: 'BTC', price: '65,432', change: '+5.2%', trending: true },
    { name: 'Ethereum', symbol: 'ETH', price: '3,456', change: '+3.8%', trending: true },
    { name: 'Solana', symbol: 'SOL', price: '145', change: '+12.4%', trending: true },
    { name: 'Cardano', symbol: 'ADA', price: '0.82', change: '-2.1%', trending: false }
  ];

  const topGainers = [
    { name: 'Injective', symbol: 'INJ', price: '45.23', change: '+28.5%' },
    { name: 'Sui', symbol: 'SUI', price: '1.85', change: '+25.7%' },
    { name: 'Fetch.ai', symbol: 'FET', price: '2.34', change: '+22.3%' },
    { name: 'Render', symbol: 'RNDR', price: '7.82', change: '+18.9%' }
  ];

  const topLosers = [
    { name: 'Pepe', symbol: 'PEPE', price: '0.000003', change: '-15.8%' },
    { name: 'GMX', symbol: 'GMX', price: '145.67', change: '-12.4%' },
    { name: 'Stacks', symbol: 'STX', price: '2.45', change: '-10.2%' },
    { name: 'Mina', symbol: 'MINA', price: '1.23', change: '-8.7%' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por suscribirte! Te mantendremos informado.');
    setEmail('');
  };

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
          <p className="text-xl text-cyan-200 mb-8">Tu portal confiable para el trading de criptomonedas</p>
        </header>

    

    
           


        <footer className="container mx-auto px-4 py-8 text-center text-cyan-300">
          <p>&copy; 2024 Sam Crypto. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
