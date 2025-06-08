import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/404-illustration.svg"
            alt="404 Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
        
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Voltar para Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-block bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Ir para Dashboard
          </Link>
        </div>
      </div>
        </div>
    );
}