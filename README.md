# Sistema de Alertas Meteorológicos

Sistema de monitoramento e alertas meteorológicos para o Brasil, desenvolvido como parte do projeto Global Solution da FIAP.

## Funcionalidades

### Autenticação de Usuários
- Login com email e senha
- Perfil do usuário com informações básicas
- Sistema de logout

### Monitoramento Meteorológico
- Visualização de dados meteorológicos em tempo real
- Mapa interativo com alertas por estado
- Dados de temperatura, umidade, vento e qualidade do ar

### Sistema de Alertas
- Alertas automáticos baseados em condições meteorológicas
- Diferentes níveis de severidade (baixo, médio, alto)
- Categorias de alerta:
  - Chuva forte
  - Temperatura alta
  - Ventos fortes
  - Qualidade do ar

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenWeather API
- React Leaflet (mapas)
- Context API (gerenciamento de estado)

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/nicholasbuzo/GlobalSolution02-Front.git
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação
│   ├── login/             # Página de login
│   ├── perfil/            # Página de perfil do usuário
│   └── page.tsx           # Página principal com mapa
├── components/            # Componentes React
├── contexts/             # Contextos (Auth, Weather)
├── services/             # Serviços (API, autenticação)
└── types/                # Definições de tipos TypeScript
```

## API de Dados Meteorológicos

O sistema utiliza a OpenWeather API para obter dados meteorológicos em tempo real. Os dados são atualizados a cada 5 minutos para evitar sobrecarga na API.

### Limites de Alertas
- Chuva: > 50mm/h
- Temperatura: > 35°C
- Vento: > 30km/h
- Qualidade do ar: > 100 AQI

## Integrantes

- João Victor Ignacio Madella - RM561007
- Nicholas Albuquerque Buzo - RM561082
- Tiago Gonçalves Costa - RM559742
