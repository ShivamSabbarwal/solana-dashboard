# Solana Dashboard Application

This repository contains a Solana dashboard application with a React frontend and a Node API backend. The application fetches data from the Solana blockchain and displays it on various charts.

## Overview

This project is a full-stack application that visualizes data from the Solana blockchain. It consists of a Node.js backend and a React frontend, both written in TypeScript. The backend fetches and caches blockchain data, while the frontend displays this data in various charts.

## Features

- **MarketCapDistribution**: Visualizes the market cap of five SPL tokens.
- **TransactionsPerSecond**: Shows the TPS (Transactions Per Second) of the Solana blockchain over time.
- **WalletBalance**: Displays the SOL balances of ten selected wallets.

## Technologies Used

- **Backend**: Node.js, TypeScript, Express, Redis, @solana/web3.js
- **Frontend**: React, TypeScript, Vite, ApexCharts
- **Containerization**: Docker, Docker Compose

## Project Structure

```plaintext
your-repo-name/
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |   |-- marketCapController.ts
|   |   |   |-- tpsController.ts
|   |   |   |-- walletBalanceController.ts
|   |   |
|   |   |-- services/
|   |   |   |-- cacheService.ts
|   |   |   |-- marketCapService.ts
|   |   |   |-- tpsService.ts
|   |   |   |-- walletBalanceService.ts
|   |   |   |-- solanaRPCService.ts
|   |   |
|   |   |-- routes/
|   |   |   |-- marketCapRoutes.ts
|   |   |   |-- tspRoutes.ts
|   |   |   |-- walletBalanceRoutes.ts
|   |   |
|   |   |-- app.ts
|   |   |-- index.ts
|   |
|   |-- Dockerfile
|   |-- docker-compose.yml
|   |-- package.json
|   |-- tsconfig.json
|
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- MarketCapChart.tsx
|   |   |   |-- TPSChart.tsx
|   |   |   |-- WalletBalanceChart.tsx
|   |   |   |-- ChartComponent.tsx
|   |   |   |-- RadioButtonGroup.tsx
|   |   |   |-- Spinner.tsx
|   |   |   
|   |   |-- __tests__/
|   |   |   |-- MarketCapChart.test.ts
|   |   |   |-- TPSChart.test.ts
|   |   |   |-- WalletBalanceChart.test.ts
|   |   |   
|   |   |-- types/
|   |   |   |-- index.ts
|   |   |   
|   |   |-- App.tsx
|   |   |-- main.tsx
|   |   |-- api.tsx
|   |   |-- main.css
|   |   |-- setupTests.ts
|   |   |
|   |-- index.html
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   |-- package.json
|   |-- tsconfig.app.json
|   |-- tsconfig.node.json
|   |-- tsconfig.json
|   |-- vite.config.ts
|
|-- README.md
```

## Setup Instructions
### Prerequisites
- Node.js 18.x or later
- Docker

### Clone the Repo
```bash
git clone https://github.com/ShivamSabbarwal/solana-dashboard.git
cd solana-dashboard
```

### Start the Backend App
- Be sure to replace **{{SOLANA_RPC_TOKEN}}** with a valid token
```bash
cd backend

touch .env
echo "SOLANA_RPC_TOKEN={{SOLANA_RPC_TOKEN}}" >> .env

docker-compose up --build
```

### Start the Frontend App
- Open a new terminal from the base of the project
```bash
cd frontend

npm install

npm run dev
```
- Open your browser to [http://localhost:5173/](http://localhost:5173/)

### Running Frontend Tests
```bash
cd frontend
npm run test
```

