-- Database Creation Script
-- Run this script as a PostgreSQL superuser (postgres)

-- Create the database
CREATE DATABASE pokedex;

-- Create the user
CREATE USER pokedex_user WITH PASSWORD 'pokedex_password';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE pokedex TO pokedex_user;

-- Connect to the pokedex database
\c pokedex;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO pokedex_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO pokedex_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO pokedex_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO pokedex_user; 