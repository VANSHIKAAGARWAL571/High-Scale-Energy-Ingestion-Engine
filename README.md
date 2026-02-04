## ✨ Features

### 🔐 Authentication & Security

- **JWT Authentication** - Secure token-based authentication
- **Auth Guards** - Route protection with custom guards
- **Helmet** - Security headers and protection
- **CORS** - Cross-origin resource sharing configuration
- **Input Validation** - Class-validator with DTOs

### 🗄️ Database & ORM

- **TypeORM Integration** - Powerful ORM with decorators
- **MySQL Support** - Production-ready database setup
- **Entity Management** - Well-structured database entities
- **Migration Support** - Database version control

### 🏗️ Architecture & Design

- **Modular Structure** - Clean, scalable architecture
- **Custom Decorators** - Reusable decorators for common tasks
- **Middleware System** - Request/response processing
- **Global Configuration** - Environment-based config management
- **API Versioning** - Built-in API version control

### 📖 Documentation & Monitoring

- **Swagger/OpenAPI** - Interactive API documentation
- **Request Logging** - Comprehensive request/response logging
- **Error Handling** - Global exception filters
- **Health Checks** - Application health monitoring

### 🔧 Development Tools

- **Hot Reload** - Development with automatic restart
- **ESLint & Prettier** - Code formatting and linting
- **Jest Testing** - Unit and E2E testing setup
- **TypeScript** - Full TypeScript support
- **Compression** - Response compression for better performance

### 🐳 Docker & Containerization

- **Multi-stage Dockerfile** - Optimized builds for dev/prod
- **Docker Compose** - Complete development environment
- **Health Checks** - Container health monitoring
- **Production Ready** - Secure, non-root user setup

## 🏗️ Architecture

```
src/
├── 🔐 auth/           # Authentication module
├── 🎨 custom-decorator/ # Custom decorators
├── 🗄️ database/        # Database configuration
├── 📊 entities/        # TypeORM entities
├── 🛡️ guards/          # Route guards
├── 🔧 middlewares/     # Custom middlewares
├── 🌐 shared/          # Shared utilities & config
├── 👤 user/            # User management module
└── 📝 swagger-setup.ts # API documentation setup
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22+
- **npm** or **yarn**
- **MySQL** 8.0+

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd nest-sample
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Database setup**

```bash
# Create your MySQL database
# Update database credentials in .env
```

5. **Start development server**

```bash
npm run dev
```

🎉 **Your application is now running at `http://localhost:3000`**

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
SERVICE_PORT=3000
NODE_ENV=development
API_VERSION=1

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=nest_sample

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=3600
```

### Configuration Validation

The application uses **class-validator** to ensure all environment variables are properly configured:

- ✅ **Type Safety** - Automatic type conversion
- ✅ **Validation** - Required fields validation
- ✅ **Error Handling** - Clear error messages for missing config

## 📚 API Documentation

### Swagger UI

Access interactive API documentation at: `http://localhost:3000/api`

### Features:

- 📖 **Interactive Documentation** - Test APIs directly from browser
- 🔐 **Authentication Support** - Built-in Bearer token auth
- 📥 **Postman Collection** - Export collection at `/api-json`
- 🔄 **Real-time Updates** - Documentation updates with code changes

### Available Endpoints

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| `POST` | `/user/signup` | User registration     |
| `GET`  | `/api`         | Swagger documentation |
| `GET`  | `/api-json`    | OpenAPI JSON spec     |

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test Structure

- **Unit Tests** - Individual component testing
- **E2E Tests** - Full application flow testing
- **Coverage Reports** - Detailed test coverage analysis

## 🚢 Deployment

### Development

```bash
npm run start:dev
```

### Production

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Docker Deployment

#### Quick Start with Docker Compose

```bash
# Start development environment
docker-compose up

# Start with detached mode
docker-compose up -d

# Start production environment
docker-compose --profile production up
```

#### Manual Docker Commands

```bash
# Build the Docker image
docker build -t nest-sample .

# Run development container
docker build --target development -t nest-sample:dev .
docker run -p 3000:3000 -v $(pwd):/app nest-sample:dev

# Run production container
docker build --target production -t nest-sample:prod .
docker run -p 3000:3000 nest-sample:prod
```

#### Docker Services

- **app**: NestJS application (development mode)
- **app-prod**: NestJS application (production mode)
- **db**: MySQL 8.0 database

#### Environment Variables for Docker

```env
# Docker-specific environment variables
NODE_ENV=development
SERVICE_PORT=3000
API_VERSION=1

# Database (when using docker-compose)
DB_HOST=db
DB_PORT=3306
DB_USER=nestuser
DB_PASSWORD=nestpassword
DB_NAME=nest_sample
```

## 📁 Project Structure

```
nest-sample/
├── 📄 README.md
├── 📦 package.json
├── ⚙️ nest-cli.json
├── 🔧 tsconfig.json
├── 🧪 jest.config.js
├── 🎨 eslint.config.mjs
│
├── 📂 src/
│   ├── 🏠 app.module.ts              # Root application module
│   ├── 🚀 main.ts                    # Application entry point
│   ├── 📖 swagger-setup.ts           # API documentation setup
│   │
│   ├── 🔐 auth/                      # Authentication module
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   │
│   ├── 🎨 custom-decorator/           # Custom decorators
│   │   └── user-decorator.ts
│   │
│   ├── 🗄️ database/                  # Database configuration
│   │   └── database.module.ts
│   │
│   ├── 📊 entities/                  # TypeORM entities
│   │   └── user.entity.ts
│   │
│   ├── 🛡️ guards/                    # Route protection
│   │   └── auth-guard.ts
│   │
│   ├── 🔧 middlewares/               # Custom middlewares
│   │   ├── logger-middleware.ts
│   │   └── sample-middleware.ts
│   │
│   ├── 🌐 shared/                    # Shared utilities
│   │   ├── shared.module.ts
│   │   ├── global-config.service.ts
│   │   └── dto/
│   │       └── env.dto.ts
│   │
│   └── 👤 user/                      # User management
│       ├── user.module.ts
│       ├── user.controller.ts
│       ├── user.service.ts
│       └── dto/
│           └── user-sign-up.dto.ts
│
└── 🧪 test/                          # Test files
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

## 🛠️ Built With

### Core Technologies

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TypeORM](https://typeorm.io/)** - Object-Relational Mapping
- **[MySQL](https://www.mysql.com/)** - Relational database

### Key Dependencies

- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation
- **[Class Validator](https://github.com/typestack/class-validator)** - Validation decorators
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Object transformation
- **[Helmet](https://helmetjs.github.io/)** - Security middleware
- **[Compression](https://github.com/expressjs/compression)** - Response compression

### Development Tools

- **[Jest](https://jestjs.io/)** - Testing framework
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🚀 Scripts

| Script                | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run build`       | Build production bundle                  |
| `npm run start`       | Start production server                  |
| `npm run dev`         | Start development server with hot reload |
| `npm run start:debug` | Start with debugging enabled             |
| `npm run lint`        | Run ESLint                               |
| `npm run format`      | Format code with Prettier                |
| `npm run test`        | Run unit tests                           |
| `npm run test:e2e`    | Run end-to-end tests                     |
| `npm run test:cov`    | Generate test coverage report            |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages

## 📋 Roadmap

- [x] 🐳 Docker containerization
- [ ] 🔄 Redis caching integration
- [ ] 📧 Email service integration
- [ ] 📱 Rate limiting
- [ ] 🔒 Role-based access control (RBAC)
- [ ] 📊 Monitoring and metrics
- [ ] 🌐 GraphQL support
- [ ] 📤 File upload handling

## 🐛 Known Issues

- None at the moment! 🎉

## 📞 Support

If you have any questions or need help:

- 📧 **Email**: [your-email@example.com]
- 💬 **Discord**: [Your Discord Server]
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/nest-sample/issues)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by developers, for developers</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
