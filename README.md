# Defi Insurance Backend

<p align="center">
  <a href="https://defi-insurance.bamboosoft.io/" target="blank"><img src="https://chromion-chainlink-hackathon.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fchromion-chainlink-hackathon%2Fprojects%2F243a76646b5e4cd985079d6224f91f94%2F00ee85a9-3c4e-4f96-87e9-cdd0f08a6d57.png&w=128&q=75" width="120" alt="Defi Insur Logo" /></a>
</p>

## Table of Contents
- [Overview](#overview)
- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Chainlink Integration](#chainlink-integration)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Resources](#resources)
- [Support](#support)
- [License](#license)

## Overview

Defi Insurance Backend is a comprehensive backend system for a decentralized insurance platform, designed for transparency, security, and scalability. The platform enables users to purchase insurance packages, manage claims, and interact with smart contracts on the Avalanche blockchain.

**Key Features:**
- 🔐 Secure authentication and authorization
- 📦 Insurance package management
- 💰 Transaction processing and blockchain integration
- 📄 File upload and management
- 📧 Email notifications
- ⏰ Scheduled tasks and background jobs
- 🔄 Real-time updates
- 📊 Comprehensive API documentation
- 🌦️ **Chainlink Weather Data Oracles** for automated insurance triggers
- 🤖 **Automated Payout System** using Chainlink Keepers
- 📈 **Real-time Weather Monitoring** for agricultural insurance

## Requirements

### System Requirements
- **Node.js**: >= 18.0.0
- **Yarn**: >= 1.22.0
- **MongoDB**: >= 5.0
- **Docker**: >= 20.10 (for containerized deployment)
- **Git**: >= 2.30

### Blockchain Requirements
- **Avalanche Network**: Fuji testnet or Mainnet
- **Web3 Provider**: RPC endpoint access
- **Smart Contracts**: Deployed insurance contracts
- **Wallet**: Master wallet with sufficient funds
- **Chainlink Oracle**: Weather data feed integration
- **Chainlink Keepers**: Automated contract execution

### Further Requirements
- **AWS S3**: For file storage
- **SMTP Server**: For email notifications
- **Redis**: For caching and session management

## Tech Stack

### Backend Framework
- <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node.js"/> [Node.js](https://nodejs.org/) - Runtime environment
- <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/> [TypeScript](https://www.typescriptlang.org/) - Programming language
- <img src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white" alt="NestJS"/> [NestJS](https://nestjs.com/) - Progressive Node.js framework

### Database & ORM
- <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB"/> [MongoDB](https://www.mongodb.com/) - NoSQL database
- <img src="https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white" alt="Mongoose"/> [Mongoose](https://mongoosejs.com/) - MongoDB object modeling

### Blockchain & Web3
- <img src="https://img.shields.io/badge/Avalanche-E84142?logo=avalanche&logoColor=white" alt="Avalanche"/> [Avalanche](https://www.avax.network/) - Blockchain platform
- <img src="https://img.shields.io/badge/Web3.js-F16822?logo=web3.js&logoColor=white" alt="Web3.js"/> [Web3.js](https://web3js.org/) - Ethereum JavaScript API
- <img src="https://img.shields.io/badge/Ethers.js-363636?logo=ethers&logoColor=white" alt="Ethers.js"/> [Ethers.js](https://docs.ethers.io/) - Ethereum library
- <img src="https://img.shields.io/badge/Chainlink-375BD2?logo=chainlink&logoColor=white" alt="Chainlink"/> [Chainlink](https://chainlinklabs.com/) - Decentralized oracle network

### Authentication & Security
- <img src="https://img.shields.io/badge/JWT-000000?logo=json-web-tokens&logoColor=white" alt="JWT"/> [JWT](https://jwt.io/) - JSON Web Tokens
- <img src="https://img.shields.io/badge/Passport.js-34E27A?logo=passport&logoColor=white" alt="Passport.js"/> [Passport.js](https://www.passportjs.org/) - Authentication middleware
- <img src="https://img.shields.io/badge/bcrypt-000000?logo=bcrypt&logoColor=white" alt="bcrypt"/> [bcrypt](https://github.com/dcodeIO/bcrypt.js/) - Password hashing

### File Storage & Cloud
- <img src="https://img.shields.io/badge/AWS_S3-569A31?logo=amazon-s3&logoColor=white" alt="AWS S3"/> [AWS S3](https://aws.amazon.com/s3/) - Object storage
- <img src="https://img.shields.io/badge/Multer-000000?logo=multer&logoColor=white" alt="Multer"/> [Multer](https://github.com/expressjs/multer) - File upload middleware

### Documentation & Testing
- <img src="https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black" alt="Swagger"/> [Swagger](https://swagger.io/) - API documentation
- <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white" alt="Jest"/> [Jest](https://jestjs.io/) - Testing framework

### Development Tools
- <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" alt="ESLint"/> [ESLint](https://eslint.org/) - Code linting
- <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white" alt="Prettier"/> [Prettier](https://prettier.io/) - Code formatting
- <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker"/> [Docker](https://www.docker.com/) - Containerization

## Chainlink Integration

This project leverages **Chainlink's decentralized oracle network** to provide reliable, tamper-proof data for automated insurance payouts. The integration includes several key components:

### 🔗 **Chainlink Oracles**
- **Weather Data Feeds**: Real-time weather information for agricultural insurance
- **Automated Triggers**: Smart contract execution based on weather conditions
- **Data Verification**: Tamper-proof weather data from multiple sources

### 🌦️ **Weather Data Integration**
The system uses Chainlink oracles to fetch real-time weather data including:
- **Temperature**: Celsius readings for heat/drought insurance
- **Rain Intensity**: Millimeter measurements for rainfall protection
- **Wind Speed**: Kilometers per hour for storm coverage
- **Humidity**: Percentage for comprehensive weather monitoring
- **Precipitation Probability**: Risk assessment for agricultural planning

### 🤖 **Automated Payout System**
- **Chainlink Keepers**: Automated contract execution when conditions are met
- **Smart Contract Triggers**: Automatic payout processing based on oracle data
- **Real-time Monitoring**: Continuous weather data tracking during insurance periods

### 📊 **Insurance Package Types**
The platform supports various agricultural insurance products:

#### Rainfall Protection Plan
- **Coverage**: Rice crops against excessive rainfall
- **Trigger**: Rain intensity > 200mm over 14 days
- **Region**: Mekong Delta (Kien Giang)

#### Drought Defense Package
- **Coverage**: Coffee crops from prolonged drought
- **Trigger**: Rain intensity < 50mm over 30 days
- **Region**: Central Highlands (Lam Dong)

#### Storm Resistance Package
- **Coverage**: Crop losses from typhoons
- **Trigger**: Wind speed ≥ 90 km/h over 3 days
- **Region**: Coastal areas (Thua Thien Hue)

#### Flood Safeguard Plan
- **Coverage**: Flood damage to rice fields
- **Trigger**: Water level > 1.2 meters over 7 days
- **Region**: Red River Delta (Hung Yen)

### 🔄 **Smart Contract Events**
The system listens to and processes various blockchain events:
- `InsurancePurchased`: New insurance policy purchase
- `WeatherDataRequested`: Oracle data request initiated
- `WeatherResponse`: Oracle data received and processed
- `handleOracleFulfillment`: Oracle callback execution

### 📈 **Data Flow Architecture**
```
Weather API → Chainlink Oracle → Smart Contract → Backend → Database
     ↓              ↓                ↓            ↓         ↓
Real-time → Tamper-proof → Automated → Event → Transaction
  Data       Verification   Triggers   Processing  Storage
```

### 🛡️ **Security Features**
- **Multi-source Verification**: Weather data from multiple oracle nodes
- **Timestamp Validation**: Ensures data freshness and relevance
- **Geographic Precision**: Location-specific weather monitoring
- **Automated Auditing**: Transparent and verifiable payout decisions

## Project Structure

```
defi-insurance-backend/
├── src/                          # Source code
│   ├── config/                   # Configuration files
│   ├── modules/                  # Feature modules
│   │   ├── auth/                 # Authentication module
│   │   ├── user/                 # User management
│   │   ├── insurance-package/    # Insurance packages
│   │   ├── transaction/          # Transaction handling
│   │   ├── smart-contract/       # Blockchain integration
│   │   ├── upload/               # File upload handling
│   │   ├── realtime/             # Real-time features
│   │   ├── schedules/            # Scheduled tasks
│   │   ├── queue/                # Background jobs
│   │   ├── database/             # Database operations
│   │   └── core/                 # Core functionality
│   ├── common/                   # Shared utilities
│   ├── guards/                   # Route guards
│   ├── interceptors/             # Request/response interceptors
│   ├── filters/                  # Exception filters
│   ├── decorators/               # Custom decorators
│   ├── exceptions/               # Custom exceptions
│   ├── providers/                # Service providers
│   ├── utils/                    # Utility functions
│   ├── app.module.ts            # Root application module
│   ├── main.ts                  # Application entry point
│   └── setup-swagger.ts         # Swagger configuration
├── data/                         # Static data and templates
│   ├── jsons/                   # JSON data files
│   │   ├── agricultural-insurance.json    # Insurance packages
│   │   └── avalanche-defi-insurance-contract.json  # Smart contract ABI
│   └── mail-templates/          # Email templates
├── test/                         # Test files
├── .vscode/                      # VS Code configuration
├── Dockerfile                    # Docker configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── nest-cli.json                # NestJS CLI configuration
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                  # Prettier configuration
└── README.md                    # Project documentation
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

### Application Configuration
```env
# App Settings
HOST=0.0.0.0                  # Server host address
PORT=3000                     # Server port
APP_URL=http://localhost:3000 # Base URL of the application
NODE_ENV=development          # Environment (development/production)
PREFIX_PATH=/api              # API prefix path
SWAGGER_ENABLED=true          # Enable Swagger documentation
APP_NAME=Defi-Insurance       # Application name
```

### Database Configuration
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/defi-insurance # MongoDB connection string
```

### Authentication & Security
```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here   # JWT secret key (use strong random string)
JWT_EXPIRES_IN=30d                          # JWT expiration time
```

### Blockchain Configuration
```env
# Avalanche Network Settings
AVALANCHE_MASTER_WALLET_ADDRESS=           # Master wallet address
AVALANCHE_MASTER_WALLET_PRIVATE_KEY=       # Master wallet private key
AVALANCHE_DEFI_INSURANCE_SMART_CONTRACT=   # Insurance smart contract address
AVALANCHE_USDC_CONTRACT_ADDRESS=           # USDC contract address
AVALANCHE_NETWORK=mainnet                  # Network selection (mainnet/fuji)

# RPC Endpoints
AVALANCHE_FUJI_HTTPS_ENDPOINT=             # Fuji testnet RPC (https)
AVALANCHE_FUJI_WSS_ENDPOINT=               # Fuji testnet RPC (wss)
AVALANCHE_MAINNET_HTTPS_ENDPOINT=          # Mainnet RPC (https)
AVALANCHE_MAINNET_WSS_ENDPOINT=            # Mainnet RPC (wss)
```

### Chainlink Configuration
```env
# Chainlink Oracle Settings
CHAINLINK_SUBSCRIPTION_ID=                 # Chainlink VRF subscription ID
CHAINLINK_ORACLE_ADDRESS=                  # Chainlink oracle contract address
CHAINLINK_KEEPER_REGISTRY=                 # Chainlink keeper registry address
CHAINLINK_WEATHER_FEED_ADDRESS=            # Weather data feed address
```

### Optional Services
```env
# AWS S3 (Optional - for file storage)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password
```

## Installation

### Step 1: Prerequisites Installation

#### Install Node.js (v18 or higher)
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc  # or source ~/.zshrc
nvm install 18
nvm use 18

# Or download from nodejs.org
# Visit https://nodejs.org/ and download the LTS version
```

#### Install Yarn
```bash
npm install -g yarn
```

#### Install MongoDB
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Ubuntu/Debian
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

#### Install Docker (Optional)
```bash
# macOS/Windows
# Download Docker Desktop from https://www.docker.com/products/docker-desktop/

# Ubuntu/Debian
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### Step 2: Project Setup

#### Clone the Repository
```bash
git clone https://github.com/Bamboo-Software/defi-insurance-backend
cd defi-insurance-backend
```

#### Install Dependencies
```bash
yarn install
```

#### Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit the .env file with your configuration
vim .env  # or use your preferred editor
```

#### Database Setup
```bash
# Ensure MongoDB is running
mongod --version

# Create database (optional - will be created automatically)
mongo
use defi-insurance
exit
```

### Step 3: Blockchain Setup

#### Configure Avalanche Network
1. Set up your Avalanche wallet
2. Configure RPC endpoints in `.env`

## Contract Addresses
```
# Smartcontract
AVALANCHE_DEFI_INSURANCE_SMART_CONTRACT=0x96C40a105c4dcA72e18a16EE511eA51bf4443685
AVALANCHE_USDC_CONTRACT_ADDRESS=0x5425890298aed601595a70AB815c96711a31Bc65
```

#### Configure Chainlink Integration
1. Set up Chainlink oracle nodes or use existing feeds
2. Configure Chainlink subscription ID
3. Deploy or connect to weather data feeds
4. Set up Chainlink Keepers for automated execution

## Development

### Running in Development Mode

#### Start Development Server
```bash
# Start with hot reload
yarn start:dev

# Or using npm
npm run start:dev
```

#### Available Development Commands
```bash
# Development server with watch mode
yarn start:dev

# Development server with debug mode
yarn start:debug

# Build the application
yarn build

# Run production build
yarn start:prod

# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format
```

### Development Workflow

1. **Start the development server**
   ```bash
   yarn start:dev
   ```

2. **Access the application**
   - API: `http://localhost:3000/api`
   - Swagger Documentation: `http://localhost:3000/api/docs`

3. **Monitor logs**
   - Application logs will appear in the terminal
   - Check for any errors or warnings

4. **Make changes**
   - Edit files in the `src/` directory
   - The server will automatically restart on file changes

### Code Quality

#### Linting and Formatting
```bash
# Check for linting issues
yarn lint

# Fix automatic linting issues
yarn lint:fix

# Format code
yarn format
```

#### Type Checking
```bash
# TypeScript compilation check
yarn build
```

## Deployment

### Docker Deployment

#### Build Docker Image
```bash
# Build the image
docker build -t defi-insurance-backend .

# Tag for registry (optional)
docker tag defi-insurance-backend your-registry/defi-insurance-backend:latest
```

#### Run with Docker
```bash
# Run with environment file
docker run --env-file .env -p 3000:3000 defi-insurance-backend

# Run with specific port mapping
docker run --env-file .env -p 8080:3000 defi-insurance-backend

# Run in detached mode
docker run -d --env-file .env -p 3000:3000 --name defi-insurance defi-insurance-backend
```

#### Docker Compose (Recommended)
Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    depends_on:
      - mongodb
    restart: unless-stopped

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_DATABASE=defi-insurance
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

Run with Docker Compose:
```bash
docker-compose up -d
```

### Production Deployment

#### Build for Production
```bash
# Install production dependencies
yarn install --production

# Build the application
yarn build

# Start production server
yarn start:prod
```

#### Environment Setup for Production
```bash
# Set production environment
export NODE_ENV=production

# Use PM2 for process management (optional)
npm install -g pm2
pm2 start dist/main.js --name "defi-insurance-backend"
pm2 startup
pm2 save
```

#### Reverse Proxy Setup (Nginx)
Create an Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Monitoring and Logs

#### Application Monitoring
```bash
# Check application status
docker ps

# View application logs
docker logs defi-insurance-backend

# Follow logs in real-time
docker logs -f defi-insurance-backend
```

#### Health Checks
- Health endpoint: `GET /api/health`
- Status endpoint: `GET /api/status`

## API Documentation

### Swagger UI
After starting the server, visit: `http://localhost:3000/api/docs`

### API Endpoints Overview
- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Insurance Packages**: `/api/insurance-packages/*`
- **Transactions**: `/api/transactions/*`
- **Smart Contracts**: `/api/smart-contracts/*`
- **File Upload**: `/api/upload/*`

### Authentication
The API uses JWT-based authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Testing

### Running Tests
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:cov

# Run e2e tests
yarn test:e2e

# Run tests in debug mode
yarn test:debug
```

### Test Structure
- Unit tests: `*.spec.ts` files alongside source files
- E2E tests: `test/` directory
- Test configuration: `jest.config.js`

## Resources

### Documentation
- [NestJS Documentation](https://docs.nestjs.com/) - Framework documentation
- [MongoDB Documentation](https://docs.mongodb.com/) - Database documentation
- [Avalanche Documentation](https://docs.avax.network/) - Blockchain documentation
- [Web3.js Documentation](https://web3js.org/docs/) - Web3 library documentation
- [Chainlink Documentation](https://docs.chain.link/) - Oracle network documentation

### Community & Support
- [NestJS Discord](https://discord.gg/G7Qnnhy) - Community support
- [NestJS Courses](https://courses.nestjs.com/) - Video tutorials
- [NestJS Devtools](https://devtools.nestjs.com/) - Development tools
- [Chainlink Discord](https://discord.gg/chainlink) - Chainlink community

### Deployment Resources
- [NestJS Mau](https://mau.nestjs.com/) - AWS deployment
- [Docker Documentation](https://docs.docker.com/) - Containerization guide
- [Nginx Documentation](https://nginx.org/en/docs/) - Reverse proxy setup

## Support

### Getting Help
- **Documentation**: Check the [NestJS Documentation](https://docs.nestjs.com/)
- **Community**: Join our [Discord channel](https://discord.gg/G7Qnnhy)
- **Issues**: Report bugs and feature requests in the project repository
- **Enterprise Support**: For commercial support, contact [enterprise support](https://enterprise.nestjs.com)

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request
