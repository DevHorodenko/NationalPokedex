import apiClient from './client';

export const pokemonAPI = {
  // Get all pokemons with pagination
  getAll: async (page = 0, size = 20) => {
    const response = await apiClient.get(`/pokemons?page=${page}&size=${size}`);
    return response.data;
  },

  // Get pokemon by ID
  getById: async (id) => {
    const response = await apiClient.get(`/pokemons/${id}`);
    return response.data;
  },

  // Get pokemon by number
  getByNumber: async (number) => {
    const response = await apiClient.get(`/pokemons/number/${number}`);
    return response.data;
  },

  // Get pokemons by type
  getByType: async (type) => {
    const response = await apiClient.get(`/pokemons/type/${type}`);
    return response.data;
  },

  // Search pokemons by name
  searchByName: async (name) => {
    const response = await apiClient.get(`/pokemons/search?name=${encodeURIComponent(name)}`);
    return response.data;
  },

  // Get pokemons by number range
  getByRange: async (start, end) => {
    const response = await apiClient.get(`/pokemons/range?start=${start}&end=${end}`);
    return response.data;
  },

  // Get user's pokemons
  getMyPokemons: async () => {
    const response = await apiClient.get('/pokemons/my-pokemons');
    return response.data;
  },

  // Create new pokemon
  create: async (pokemonData) => {
    const response = await apiClient.post('/pokemons', pokemonData);
    return response.data;
  },

  // Update pokemon
  update: async (id, pokemonData) => {
    const response = await apiClient.put(`/pokemons/${id}`, pokemonData);
    return response.data;
  },

  // Delete pokemon
  delete: async (id) => {
    const response = await apiClient.delete(`/pokemons/${id}`);
    return response.data;
  }
}; 