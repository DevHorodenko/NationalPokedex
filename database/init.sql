-- National Pokedex Database Initialization Script
-- This script creates the database schema and initial data

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'USER',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pokemons table
CREATE TABLE IF NOT EXISTS pokemons (
    id BIGSERIAL PRIMARY KEY,
    pokemon_number INTEGER UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    height_m DOUBLE PRECISION,
    weight_kg DOUBLE PRECISION,
    base_experience INTEGER,
    hp INTEGER,
    attack INTEGER,
    defense INTEGER,
    special_attack INTEGER,
    special_defense INTEGER,
    speed INTEGER,
    image_url VARCHAR(255),
    sprite_url VARCHAR(255),
    user_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pokemon_types table
CREATE TABLE IF NOT EXISTS pokemon_types (
    pokemon_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    PRIMARY KEY (pokemon_id, type),
    FOREIGN KEY (pokemon_id) REFERENCES pokemons(id) ON DELETE CASCADE
);

-- Create pokemon_abilities table
CREATE TABLE IF NOT EXISTS pokemon_abilities (
    pokemon_id BIGINT NOT NULL,
    ability VARCHAR(100) NOT NULL,
    PRIMARY KEY (pokemon_id, ability),
    FOREIGN KEY (pokemon_id) REFERENCES pokemons(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pokemons_number ON pokemons(pokemon_number);
CREATE INDEX IF NOT EXISTS idx_pokemons_name ON pokemons(name);
CREATE INDEX IF NOT EXISTS idx_pokemons_user_id ON pokemons(user_id);
CREATE INDEX IF NOT EXISTS idx_pokemon_types_pokemon_id ON pokemon_types(pokemon_id);
CREATE INDEX IF NOT EXISTS idx_pokemon_abilities_pokemon_id ON pokemon_abilities(pokemon_id);

-- Insert some sample Pokemon data
INSERT INTO pokemons (pokemon_number, name, description, height_m, weight_kg, base_experience, hp, attack, defense, special_attack, special_defense, speed, image_url, sprite_url) VALUES
(1, 'Bulbasaur', 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.', 0.7, 6.9, 64, 45, 49, 49, 65, 65, 45, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'),
(2, 'Ivysaur', 'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.', 1.0, 13.0, 142, 60, 62, 63, 80, 80, 60, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'),
(3, 'Venusaur', 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.', 2.0, 100.0, 263, 80, 82, 83, 100, 100, 80, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'),
(4, 'Charmander', 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.', 0.6, 8.5, 62, 39, 52, 43, 60, 50, 65, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'),
(5, 'Charmeleon', 'When it swings its burning tail, it elevates the temperature to unbearably hot levels.', 1.1, 19.0, 142, 58, 64, 58, 80, 65, 80, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'),
(6, 'Charizard', 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.', 1.7, 90.5, 267, 78, 84, 78, 109, 85, 100, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'),
(7, 'Squirtle', 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.', 0.5, 9.0, 63, 44, 48, 65, 50, 64, 43, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'),
(8, 'Wartortle', 'Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.', 1.0, 22.5, 142, 59, 63, 80, 65, 80, 58, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png'),
(9, 'Blastoise', 'A brutal Pokémon with pressurized water jets on its shell. They are used for high speed tackles.', 1.6, 85.5, 265, 79, 83, 100, 85, 105, 78, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'),
(10, 'Caterpie', 'Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.', 0.3, 2.9, 39, 45, 30, 35, 20, 20, 45, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png')
ON CONFLICT (pokemon_number) DO NOTHING;

-- Insert Pokemon types
INSERT INTO pokemon_types (pokemon_id, type) VALUES
(1, 'Grass'), (1, 'Poison'),
(2, 'Grass'), (2, 'Poison'),
(3, 'Grass'), (3, 'Poison'),
(4, 'Fire'),
(5, 'Fire'),
(6, 'Fire'), (6, 'Flying'),
(7, 'Water'),
(8, 'Water'),
(9, 'Water'),
(10, 'Bug')
ON CONFLICT (pokemon_id, type) DO NOTHING;

-- Insert Pokemon abilities
INSERT INTO pokemon_abilities (pokemon_id, ability) VALUES
(1, 'Overgrow'), (1, 'Chlorophyll'),
(2, 'Overgrow'), (2, 'Chlorophyll'),
(3, 'Overgrow'), (3, 'Chlorophyll'),
(4, 'Blaze'), (4, 'Solar Power'),
(5, 'Blaze'), (5, 'Solar Power'),
(6, 'Blaze'), (6, 'Solar Power'),
(7, 'Torrent'), (7, 'Rain Dish'),
(8, 'Torrent'), (8, 'Rain Dish'),
(9, 'Torrent'), (9, 'Rain Dish'),
(10, 'Shield Dust'), (10, 'Run Away')
ON CONFLICT (pokemon_id, ability) DO NOTHING;

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

CREATE TRIGGER update_pokemons_updated_at BEFORE UPDATE ON pokemons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 