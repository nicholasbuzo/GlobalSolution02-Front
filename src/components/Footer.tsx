import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} GeoTrack. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/sobre" className="text-gray-400 hover:text-white">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-400 hover:text-white">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 