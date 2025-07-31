import React from 'react';
import { useQuery } from 'react-query';
import { pokemonAPI } from '../api/pokemon';
import PokemonCard from '../components/Pokemon/PokemonCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';

const MyPokemon = () => {
  const {
    data: myPokemon,
    isLoading,
    error
  } = useQuery(
    ['my-pokemon'],
    () => pokemonAPI.getMyPokemons(),
    {
      onError: () => {
        toast.error('Failed to load your Pokémon collection');
      }
    }
  );

  if (isLoading) {
    return <LoadingSpinner text="Loading your collection..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Failed to load your collection</div>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Collection</h1>
        <p className="text-gray-600 mt-2">
          Your personal Pokémon collection
        </p>
      </div>

      {myPokemon && myPokemon.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">Your collection is empty</div>
          <p className="text-gray-600 mb-6">
            Start building your collection by adding Pokémon from the Pokédex
          </p>
          <a
            href="/pokemon"
            className="btn-primary"
          >
            Browse Pokédex
          </a>
        </div>
      )}
    </div>
  );
};

export default MyPokemon; 