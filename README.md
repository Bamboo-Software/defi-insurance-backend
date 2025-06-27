# Defi Insurance Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Overview
- [About Project](#about-project)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Resources](#resources)
- [Support](#support)
- [Stay in touch](#stay-in-touch)
- [License](#license)

## About Project
Defi Insurance Backend is the backend system for a decentralized insurance platform, designed for transparency, security, and scalability.

**Built with:**
- <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node.js"/> [Node.js](https://nodejs.org/)
- <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/> [TypeScript](https://www.typescriptlang.org/)
- <img src="https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black" alt="Swagger"/> [Swagger](https://swagger.io/)
- MongoDB
- Docker
- Avalanche Blockchain

## Getting Started

### Prerequisites
- Node.js >= 18
- Yarn
- Docker (for containerized deployment)

### Installation
If you don't have Node.js, Yarn, or Docker installed, follow these steps:

#### 1. Install Node.js (v18 or higher)
- Download and install from [nodejs.org](https://nodejs.org/)
- Or, using nvm (Node Version Manager):
  ```bash
  # Install nvm if you don't have it
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  # Restart your terminal, then:
  nvm install 18
  nvm use 18
  ```

#### 2. Install Yarn
```bash
npm install -g yarn
```

#### 3. Install Docker
- Download and install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
- Or follow the [official Docker installation guide](https://docs.docker.com/get-docker/)

#### 4. Clone the repository and install dependencies
```bash
git clone <your-repo-url>
cd <project-folder>
yarn install
```

### Run with Docker
```bash
docker build -t defi-insurance-backend .
docker run --env-file .env -p 3000:3000 defi-insurance-backend
```

### Development commands
```bash
# Run in development mode
yarn start:dev
# Build for production
yarn build
# Run in production mode
yarn start:prod
```

### API Documentation
After starting the server, visit: `http://localhost:3000/api/docs` for Swagger UI.

## Environment Variables
Create a `.env` file in the project root with the following variables:

```env
# App
HOST=0.0.0.0                  # Server host address
PORT=3000                     # Server port
APP_URL=http://localhost:3000 # Base URL of the application
NODE_ENV=development          # Environment (development/production)
PREFIX_PATH=/api              # API prefix path
SWAGGER_ENABLED=true          # Swagger enable
APP_NAME=Defi-Insurance       # Application name

# MongoDB
MONGODB_URI=mongodb://localhost:27017/defi-insurance # MongoDB connection string

# Jwt config
JWT_SECRET=defi-insurance@2025xxxyyyzzz   # JWT secret
JWT_EXPIRES_IN=30d                        # JWT expiration time

# Avalanche/Blockchain
AVALANCHE_MASTER_WALLET_ADDRESS=           # Master wallet address
AVALANCHE_MASTER_WALLET_PRIVATE_KEY=       # Master wallet private key
AVALANCHE_DEFI_INSURANCE_SMART_CONTRACT=   # Insurance smart contract address
AVALANCHE_USDC_CONTRACT_ADDRESS=           # USDC contract address
AVALANCHE_FUJI_HTTPS_ENDPOINT=             # Fuji testnet RPC (https)
AVALANCHE_FUJI_WSS_ENDPOINT=               # Fuji testnet RPC (wss)
AVALANCHE_MAINNET_HTTPS_ENDPOINT=          # Mainnet RPC (https)
AVALANCHE_MAINNET_WSS_ENDPOINT=            # Mainnet RPC (wss)
AVALANCHE_NETWORK=mainnet                  # Network selection (mainnet/fuji)
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
