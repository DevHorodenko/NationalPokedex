#!/bin/bash

# National Pokedex Database Setup Script
# This script sets up the PostgreSQL database for the National Pokedex application

echo "Setting up National Pokedex Database..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "Error: PostgreSQL is not installed or not in PATH"
    echo "Please install PostgreSQL first: https://www.postgresql.org/download/"
    exit 1
fi

# Check if PostgreSQL service is running
if ! pg_isready -q; then
    echo "Error: PostgreSQL service is not running"
    echo "Please start PostgreSQL service first"
    exit 1
fi

echo "PostgreSQL is running. Proceeding with database setup..."

# Create database and user
echo "Creating database and user..."
psql -U postgres -f database/create_database.sql

if [ $? -eq 0 ]; then
    echo "Database and user created successfully!"
else
    echo "Error: Failed to create database and user"
    echo "Make sure you're running this script with appropriate privileges"
    exit 1
fi

# Initialize the database schema
echo "Initializing database schema..."
psql -U pokedex_user -d pokedex -f database/init.sql

if [ $? -eq 0 ]; then
    echo "Database schema initialized successfully!"
    echo ""
    echo "Database setup completed!"
    echo "Connection details:"
    echo "  Host: localhost"
    echo "  Port: 5432"
    echo "  Database: pokedex"
    echo "  Username: pokedex_user"
    echo "  Password: pokedex_password"
    echo ""
    echo "You can now start the application with:"
    echo "  mvn spring-boot:run -Dspring.profiles.active=dev"
else
    echo "Error: Failed to initialize database schema"
    exit 1
fi 