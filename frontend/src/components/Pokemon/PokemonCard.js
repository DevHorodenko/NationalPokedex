import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const PokemonCard = ({ pokemon }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-pokemon-normal',
      fire: 'bg-pokemon-fire',
      water: 'bg-pokemon-water',
      electric: 'bg-pokemon-electric',
      grass: 'bg-pokemon-grass',
      ice: 'bg-pokemon-ice',
      fighting: 'bg-pokemon-fighting',
      poison: 'bg-pokemon-poison',
      ground: 'bg-pokemon-ground',
      flying: 'bg-pokemon-flying',
      psychic: 'bg-pokemon-psychic',
      bug: 'bg-pokemon-bug',
      rock: 'bg-pokemon-rock',
      ghost: 'bg-pokemon-ghost',
      dragon: 'bg-pokemon-dragon',
      dark: 'bg-pokemon-dark',
      steel: 'bg-pokemon-steel',
      fairy: 'bg-pokemon-fairy',
    };
    return typeColors[type.toLowerCase()] || 'bg-gray-500';
  };

  const getTotalStats = () => {
    return pokemon.hp + pokemon.attack + pokemon.defense + 
           pokemon.specialAttack + pokemon.specialDefense + pokemon.speed;
  };

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
        {/* Pokemon Image */}
        <div className="relative mb-4">
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {pokemon.spriteUrl ? (
              <img
                src={pokemon.spriteUrl}
                alt={pokemon.name}
                className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="hidden w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl">?</span>
            </div>
          </div>
          
          {/* Pokemon Number */}
          <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-bold text-gray-700">
            #{pokemon.pokemonNumber}
          </div>

          {/* Favorite Icon */}
          <div className="absolute top-2 right-2">
            <button
              onClick={handleFavoriteClick}
              className="p-1 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200"
            >
              <Heart 
                className={`w-5 h-5 transition-colors duration-200 ${
                  isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-400'
                }`} 
              />
            </button>
          </div>
        </div>

        {/* Pokemon Info */}
        <div className="space-y-3">
          {/* Name */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 capitalize group-hover:text-primary-600 transition-colors duration-200">
              {pokemon.name}
            </h3>
          </div>

          {/* Types */}
          <div className="flex justify-center gap-2">
            {pokemon.types && pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`type-badge ${getTypeColor(type)}`}
              >
                {type}
              </span>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-gray-700">HP</div>
              <div className="text-gray-600">{pokemon.hp}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">ATK</div>
              <div className="text-gray-600">{pokemon.attack}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">DEF</div>
              <div className="text-gray-600">{pokemon.defense}</div>
            </div>
          </div>

          {/* Total Stats */}
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
            <Zap className="w-4 h-4" />
            <span>Total: {getTotalStats()}</span>
          </div>

          {/* Physical Attributes */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>Height: {pokemon.heightM}m</span>
            <span>Weight: {pokemon.weightKg}kg</span>
          </div>

          {/* Add to Collection Button */}
          {isAuthenticated && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toast.success(`${pokemon.name} added to your collection!`);
              }}
              className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Add to Collection
            </button>
          )}

          {/* Abilities Preview */}
          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <div className="text-xs text-gray-600">
              <div className="font-medium mb-1">Abilities:</div>
              <div className="flex flex-wrap gap-1">
                {pokemon.abilities.slice(0, 2).map((ability, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded text-xs"
                  >
                    {ability}
                  </span>
                ))}
                {pokemon.abilities.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                    +{pokemon.abilities.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard; 