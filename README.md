# National Pokedex API Backend

A comprehensive REST API backend for managing Pokemon data and user collections, built with Spring Boot.

## 🚀 Features

- **User Management**: Registration, authentication, and user profile management
- **Pokemon Management**: CRUD operations for Pokemon data
- **JWT Authentication**: Secure token-based authentication
- **Role-based Authorization**: User and Admin roles with different permissions
- **RESTful API**: Well-structured REST endpoints
- **Swagger Documentation**: Interactive API documentation
- **Database Support**: H2 (development) and PostgreSQL (production)
- **Comprehensive Testing**: Unit and integration tests
- **Actuator**: Health checks and monitoring endpoints

## 🛠️ Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **PostgreSQL** (primary database)
- **H2 Database** (testing)
- **Maven**
- **Lombok**
- **Swagger/OpenAPI 3**
- **JUnit 5**

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL 12 or higher

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd NationalPokedex
```

### 2. Set up the database
The application uses PostgreSQL as the primary database. Follow the database setup instructions:

#### Quick Setup (Recommended)
```bash
# Windows
database\setup_database.bat

# Unix/Linux/macOS
chmod +x database/setup_database.sh
./database/setup_database.sh
```

For detailed database setup instructions, see [database/README.md](database/README.md).

### 3. Run the application
```bash
# Development mode (creates/drops schema automatically)
mvn spring-boot:run -Dspring.profiles.active=dev

# Production mode (validates schema)
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Access the API documentation
- Swagger UI: `http://localhost:8080/api/v1/swagger-ui.html`
- API Docs: `http://localhost:8080/api/v1/api-docs`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user information

### Users
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/{id}` - Get user by ID
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user (Admin only)
- `PATCH /api/v1/users/{id}/deactivate` - Deactivate user (Admin only)

### Pokemons
- `GET /api/v1/pokemons` - Get all pokemons (paginated)
- `GET /api/v1/pokemons/{id}` - Get pokemon by ID
- `GET /api/v1/pokemons/number/{pokemonNumber}` - Get pokemon by number
- `GET /api/v1/pokemons/type/{type}` - Get pokemons by type
- `GET /api/v1/pokemons/search?name={name}` - Search pokemons by name
- `GET /api/v1/pokemons/range?start={start}&end={end}` - Get pokemons by number range
- `GET /api/v1/pokemons/my-pokemons` - Get user's pokemons
- `POST /api/v1/pokemons` - Create new pokemon
- `PUT /api/v1/pokemons/{id}` - Update pokemon
- `DELETE /api/v1/pokemons/{id}` - Delete pokemon

## 🔐 Security

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register or login to get a JWT token
2. Include the token in the Authorization header: `Bearer <token>`

### Example:
```bash
curl -H "Authorization: Bearer <your-jwt-token>" \
     http://localhost:8080/api/v1/pokemons
```

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Encrypted)
- `first_name`
- `last_name`
- `role` (USER/ADMIN)
- `is_active`
- `created_at`
- `updated_at`

### Pokemons Table
- `id` (Primary Key)
- `pokemon_number` (Unique)
- `name`
- `description`
- `height_m`
- `weight_kg`
- `base_experience`
- `types` (Collection)
- `abilities` (Collection)
- `hp`, `attack`, `defense`, `special_attack`, `special_defense`, `speed`
- `image_url`
- `sprite_url`
- `user_id` (Foreign Key)
- `created_at`
- `updated_at`

## 🧪 Testing

### Run all tests
```bash
mvn test
```

### Run specific test
```bash
mvn test -Dtest=PokemonControllerTest
```

### Run with coverage
```bash
mvn clean test jacoco:report
```

## 📦 Building

### Build the application
```bash
mvn clean package
```

### Run the JAR file
```bash
java -jar target/api-backend-1.0.0.jar
```

## 🐳 Docker

### Using Docker Compose (Recommended)
The easiest way to run the application with PostgreSQL:

```bash
# Start the application with PostgreSQL
docker-compose up

# Run in background
docker-compose up -d

# Stop the application
docker-compose down
```

This will start:
- PostgreSQL database on port 5432
- Spring Boot application on port 8080
- Database will be automatically initialized with sample data

### Manual Docker Setup
```bash
# Build the application
docker build -t national-pokedex-api .

# Run with PostgreSQL
docker run -p 8080:8080 --name national-pokedex-api national-pokedex-api
```

## 🔧 Configuration

### Application Profiles

The application supports different profiles for different environments:

- **Default**: Uses PostgreSQL with schema validation
- **Dev**: Uses PostgreSQL with automatic schema creation/drop
- **Docker**: Uses PostgreSQL with Docker-specific settings
- **Test**: Uses H2 in-memory database

### Development
```bash
# Run with development profile (creates/drops schema automatically)
mvn spring-boot:run -Dspring.profiles.active=dev
```

### Production
The application uses PostgreSQL by default. Update the `application.yml` file with your production database settings:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/pokedex
    username: your_username
    password: your_password
  jpa:
    hibernate:
      ddl-auto: validate
```

## 📊 Monitoring

The application includes Spring Boot Actuator for monitoring:

- Health check: `http://localhost:8080/api/v1/actuator/health`
- Metrics: `http://localhost:8080/api/v1/actuator/metrics`
- Info: `http://localhost:8080/api/v1/actuator/info`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact:
- Email: support@nationalpokedex.com
- Documentation: [API Documentation](http://localhost:8080/api/v1/swagger-ui.html)
