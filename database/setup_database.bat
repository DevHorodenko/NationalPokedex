@echo off
REM National Pokedex Database Setup Script for Windows
REM This script sets up the PostgreSQL database for the National Pokedex application

echo Setting up National Pokedex Database...

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: PostgreSQL is not installed or not in PATH
    echo Please install PostgreSQL first: https://www.postgresql.org/download/
    pause
    exit /b 1
)

REM Check if PostgreSQL service is running
pg_isready -q
if %errorlevel% neq 0 (
    echo Error: PostgreSQL service is not running
    echo Please start PostgreSQL service first
    pause
    exit /b 1
)

echo PostgreSQL is running. Proceeding with database setup...

REM Create database and user
echo Creating database and user...
psql -U postgres -f database\create_database.sql

if %errorlevel% equ 0 (
    echo Database and user created successfully!
) else (
    echo Error: Failed to create database and user
    echo Make sure you're running this script with appropriate privileges
    pause
    exit /b 1
)

REM Initialize the database schema
echo Initializing database schema...
psql -U pokedex_user -d pokedex -f database\init.sql

if %errorlevel% equ 0 (
    echo Database schema initialized successfully!
    echo.
    echo Database setup completed!
    echo Connection details:
    echo   Host: localhost
    echo   Port: 5432
    echo   Database: pokedex
    echo   Username: pokedex_user
    echo   Password: pokedex_password
    echo.
    echo You can now start the application with:
    echo   mvn spring-boot:run -Dspring.profiles.active=dev
) else (
    echo Error: Failed to initialize database schema
    pause
    exit /b 1
)

pause 