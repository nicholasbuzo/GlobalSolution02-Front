'use client';

import Image from 'next/image';

interface TeamMember {
  name: string;
  studentCode: string;
  photoUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "João Victor Ignacio Madella",
    studentCode: "RM561007",
    photoUrl: "/integrante1.png" // Você precisará adicionar as fotos na pasta public/images
  },
  {
    name: "Nicholas Albuquerque Buzo",
    studentCode: "RM561082",
    photoUrl: "/integrante2.png"
  },
  {
    name: "Tiago Gonçalves Costa",
    studentCode: "RM559742",
    photoUrl: "/integrante3.png"
  }
];

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre o Projeto</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Este projeto foi desenvolvido como parte do trabalho de graduação da FIAP.
            Conheça os membros da equipe que contribuíram para o desenvolvimento desta solução.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex flex-col items-center">
                  {/* Área da foto circular */}
                  <div className="relative w-48 h-48 mb-6">
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-blue-500">
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Nome do membro */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>

                  {/* Código do aluno */}
                  <p className="text-lg text-blue-600 font-semibold">
                    {member.studentCode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}