# National Pokedex Database Setup

This directory contains the database setup scripts for the National Pokedex application using PostgreSQL.

## Prerequisites

1. **PostgreSQL Installation**: Make sure PostgreSQL is installed on your system

   - Download from: https://www.postgresql.org/download/
   - For Windows: Use the PostgreSQL installer
   - For macOS: Use Homebrew: `brew install postgresql`
   - For Ubuntu/Debian: `sudo apt-get install postgresql postgresql-contrib`

2. **PostgreSQL Service**: Ensure the PostgreSQL service is running
   - Windows: Check Services app or run `net start postgresql`
   - macOS: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`

## Quick Setup

### Option 1: Automated Setup (Recommended)

#### Windows

```bash
# Run the Windows batch script
database\setup_database.bat
```

#### Unix/Linux/macOS

```bash
# Make the script executable
chmod +x database/setup_database.sh

# Run the setup script
./database/setup_database.sh
```

### Option 2: Manual Setup

1. **Create Database and User**:

   ```bash
   # Connect as postgres superuser
   psql -U postgres

   # Run the database creation script
   \i database/create_database.sql
   ```

2. **Initialize Schema**:

   ```bash
   # Connect as the application user
   psql -U pokedex_user -d pokedex

   # Run the initialization script
   \i database/init.sql
   ```

## Database Configuration

### Connection Details

- **Host**: localhost
- **Port**: 5432
- **Database**: pokedex
- **Username**: pokedex_user
- **Password**: pokedex_password

### Application Profiles

The application uses different profiles for different environments:

- **Default**: Uses PostgreSQL with `ddl-auto: validate`
- **Dev**: Uses PostgreSQL with `ddl-auto: create-drop` (for development)
- **Docker**: Uses PostgreSQL with Docker-specific settings
- **Test**: Uses H2 in-memory database

## Database Schema

### Tables

1. **users**: Stores user account information

   - id (BIGSERIAL PRIMARY KEY)
   - username (VARCHAR(50) UNIQUE)
   - email (VARCHAR(100) UNIQUE)
   - password (VARCHAR(255))
   - role (VARCHAR(20))
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

2. **pokemon**: Stores Pokemon information
   - id (BIGSERIAL PRIMARY KEY)
   - name (VARCHAR(100))
   - type (VARCHAR(50))
   - description (TEXT)
   - height (DECIMAL(5,2))
   - weight (DECIMAL(5,2))
   - base_experience (INTEGER)
   - image_url (VARCHAR(255))
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

### Indexes

- idx_users_username: On users(username)
- idx_users_email: On users(email)
- idx_pokemon_name: On pokemon(name)
- idx_pokemon_type: On pokemon(type)

### Triggers

- update_users_updated_at: Automatically updates updated_at on user changes
- update_pokemon_updated_at: Automatically updates updated_at on pokemon changes

## Sample Data

The initialization script includes sample Pokemon data for the first 10 Pokemon:

- Bulbasaur, Ivysaur, Venusaur
- Charmander, Charmeleon, Charizard
- Squirtle, Wartortle, Blastoise
- Caterpie

## Running the Application

### Development Mode

```bash
mvn spring-boot:run -Dspring.profiles.active=dev
```

### Production Mode

```bash
mvn spring-boot:run
```

### Docker Mode

```bash
docker-compose up
```

## Troubleshooting

### Common Issues

1. **Connection Refused**:

   - Ensure PostgreSQL service is running
   - Check if port 5432 is available
   - Verify firewall settings

2. **Authentication Failed**:

   - Check username and password
   - Ensure user has proper privileges
   - Verify pg_hba.conf configuration

3. **Database Not Found**:

   - Run the database creation script
   - Check if database name is correct

4. **Permission Denied**:
   - Run setup scripts as postgres superuser
   - Check file permissions on scripts

### Useful Commands

```bash
# Check PostgreSQL status
pg_isready

# List databases
psql -U postgres -l

# Connect to database
psql -U pokedex_user -d pokedex

# List tables
\dt

# Describe table
\d table_name

# Backup database
pg_dump -U pokedex_user pokedex > backup.sql

# Restore database
psql -U pokedex_user -d pokedex < backup.sql
```

## Security Notes

- Change default passwords in production
- Use environment variables for sensitive data
- Configure proper network access controls
- Regularly backup your database
- Keep PostgreSQL updated
