import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { pokemonAPI } from '../api/pokemon';
import PokemonCard from '../components/Pokemon/PokemonCard';
import toast from 'react-hot-toast';

const PokemonList = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const pageSize = 20;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(0); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch Pokemon data
  const {
    data: pokemonData,
    isLoading,
    error,
    refetch
  } = useQuery(
    ['pokemon', page, debouncedSearchTerm, selectedType],
    async () => {
      if (debouncedSearchTerm) {
        return await pokemonAPI.searchByName(debouncedSearchTerm);
      } else if (selectedType) {
        return await pokemonAPI.getByType(selectedType);
      } else {
        return await pokemonAPI.getAll(page, pageSize);
      }
    },
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error('Failed to load Pokémon data');
      }
    }
  );

  const pokemonTypes = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
    'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
    'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(selectedType === type ? '' : type);
    setPage(0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setPage(0);
  };

  const hasFilters = searchTerm || selectedType;

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Failed to load Pokémon data</div>
        <button
          onClick={() => refetch()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pokédex</h1>
          <p className="text-gray-600 mt-2">
            Explore the complete National Pokédex
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid'
                ? 'bg-primary-100 text-primary-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list'
                ? 'bg-primary-100 text-primary-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Pokémon by name..."
                value={searchTerm}
                onChange={handleSearch}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <select
              value={selectedType}
              onChange={(e) => handleTypeFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Types</option>
              {pokemonTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="btn-secondary whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Type: {selectedType}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Pokémon...</p>
        </div>
      )}

      {/* Pokemon Grid/List */}
      {!isLoading && pokemonData && (
        <>
          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {pokemonData.content?.length || pokemonData.length} Pokémon
            {pokemonData.totalElements && ` of ${pokemonData.totalElements}`}
          </div>

          {/* Pokemon Cards */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {(pokemonData.content || pokemonData).map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {/* Pagination */}
          {pokemonData.totalPages > 1 && !hasFilters && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pokemonData.totalPages) }, (_, i) => {
                  const pageNumber = Math.max(0, Math.min(pokemonData.totalPages - 5, page - 2)) + i;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        page === pageNumber
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= pokemonData.totalPages - 1}
                className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* No Results */}
          {(pokemonData.content?.length === 0 || pokemonData.length === 0) && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No Pokémon found</div>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonList; 