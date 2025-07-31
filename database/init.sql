-- National Pokedex Database Initialization Script
-- This script creates the database, user, and initial schema

-- Create database (run this as postgres superuser)
-- CREATE DATABASE pokedex;

-- Create user and grant privileges
CREATE USER pokedex_user WITH PASSWORD 'pokedex_password';
GRANT ALL PRIVILEGES ON DATABASE pokedex TO pokedex_user;

-- Connect to the pokedex database
\c pokedex;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO pokedex_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pokedex_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO pokedex_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO pokedex_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO pokedex_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO pokedex_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO pokedex_user;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pokemon table
CREATE TABLE IF NOT EXISTS pokemon (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    base_experience INTEGER,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pokemon_name ON pokemon(name);
CREATE INDEX IF NOT EXISTS idx_pokemon_type ON pokemon(type);

-- Insert some sample Pokemon data
INSERT INTO pokemon (name, type, description, height, weight, base_experience, image_url) VALUES
('Bulbasaur', 'Grass/Poison', 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.', 0.7, 6.9, 64, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'),
('Ivysaur', 'Grass/Poison', 'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.', 1.0, 13.0, 142, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'),
('Venusaur', 'Grass/Poison', 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.', 2.0, 100.0, 263, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'),
('Charmander', 'Fire', 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.', 0.6, 8.5, 62, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'),
('Charmeleon', 'Fire', 'When it swings its burning tail, it elevates the temperature to unbearably hot levels.', 1.1, 19.0, 142, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'),
('Charizard', 'Fire/Flying', 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.', 1.7, 90.5, 267, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'),
('Squirtle', 'Water', 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.', 0.5, 9.0, 63, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'),
('Wartortle', 'Water', 'Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.', 1.0, 22.5, 142, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png'),
('Blastoise', 'Water', 'A brutal Pokémon with pressurized water jets on its shell. They are used for high speed tackles.', 1.6, 85.5, 265, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'),
('Caterpie', 'Bug', 'Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.', 0.3, 2.9, 39, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png')
ON CONFLICT (name) DO NOTHING;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pokemon_updated_at BEFORE UPDATE ON pokemon
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 