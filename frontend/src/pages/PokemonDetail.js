import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ArrowLeft, Heart, Edit, Trash2, Zap, Shield, Target } from 'lucide-react';
import { pokemonAPI } from '../api/pokemon';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';

const PokemonDetail = () => {
  const { id } = useParams();

  const {
    data: pokemon,
    isLoading,
    error
  } = useQuery(
    ['pokemon', id],
    () => pokemonAPI.getById(id),
    {
      onError: () => {
        toast.error('Failed to load Pokémon details');
      }
    }
  );

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

  const getStatColor = (value) => {
    if (value >= 100) return 'bg-green-500';
    if (value >= 80) return 'bg-blue-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading Pokémon details..." />;
  }

  if (error || !pokemon) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Pokémon not found</div>
        <Link to="/pokemon" className="btn-primary">
          Back to Pokédex
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/pokemon"
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {pokemon.name}
          </h1>
          <p className="text-gray-600">#{pokemon.pokemonNumber}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Basic Info */}
        <div className="space-y-6">
          {/* Pokemon Image */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 flex items-center justify-center">
            {pokemon.spriteUrl ? (
              <img
                src={pokemon.spriteUrl}
                alt={pokemon.name}
                className="w-64 h-64 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="hidden w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-8xl">?</span>
            </div>
          </div>

          {/* Types */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Types</h3>
            <div className="flex gap-2">
              {pokemon.types && pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className={`type-badge ${getTypeColor(type)}`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Attributes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Height</label>
                <p className="text-lg font-medium">{pokemon.heightM}m</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Weight</label>
                <p className="text-lg font-medium">{pokemon.weightKg}kg</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Base Experience</label>
                <p className="text-lg font-medium">{pokemon.baseExperience}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats and Details */}
        <div className="space-y-6">
          {/* Description */}
          {pokemon.description && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{pokemon.description}</p>
            </div>
          )}

          {/* Base Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Base Stats</h3>
            <div className="space-y-4">
              {[
                { name: 'HP', value: pokemon.hp, icon: Heart },
                { name: 'Attack', value: pokemon.attack, icon: Target },
                { name: 'Defense', value: pokemon.defense, icon: Shield },
                { name: 'Special Attack', value: pokemon.specialAttack, icon: Zap },
                { name: 'Special Defense', value: pokemon.specialDefense, icon: Shield },
                { name: 'Speed', value: pokemon.speed, icon: Zap }
              ].map((stat) => (
                <div key={stat.name} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-32">
                    <stat.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{stat.name}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatColor(stat.value)}`}
                          style={{ width: `${(stat.value / 150) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total Stats */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-primary-600">
                  {pokemon.hp + pokemon.attack + pokemon.defense + 
                   pokemon.specialAttack + pokemon.specialDefense + pokemon.speed}
                </span>
              </div>
            </div>
          </div>

          {/* Abilities */}
          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 btn-primary flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              Add to Collection
            </button>
            <button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <Trash2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail; 