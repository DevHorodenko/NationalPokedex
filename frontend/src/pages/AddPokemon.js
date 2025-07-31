import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { pokemonAPI } from '../api/pokemon';
import toast from 'react-hot-toast';

const AddPokemon = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await pokemonAPI.create(data);
      toast.success('Pokémon added successfully!');
      navigate('/my-pokemon');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add Pokémon';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Pokémon</h1>
        <p className="text-gray-600 mt-2">
          Add a new Pokémon to your collection
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pokémon Number
              </label>
              <input
                type="number"
                {...register('pokemonNumber', { required: 'Pokémon number is required' })}
                className="input-field mt-1"
                placeholder="1"
              />
              {errors.pokemonNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.pokemonNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="input-field mt-1"
                placeholder="Bulbasaur"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="input-field mt-1"
              placeholder="A strange seed was planted on its back at birth..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (m)
              </label>
              <input
                type="number"
                step="0.1"
                {...register('heightM', { required: 'Height is required' })}
                className="input-field mt-1"
                placeholder="0.7"
              />
              {errors.heightM && (
                <p className="mt-1 text-sm text-red-600">{errors.heightM.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                {...register('weightKg', { required: 'Weight is required' })}
                className="input-field mt-1"
                placeholder="6.9"
              />
              {errors.weightKg && (
                <p className="mt-1 text-sm text-red-600">{errors.weightKg.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Base Experience
              </label>
              <input
                type="number"
                {...register('baseExperience', { required: 'Base experience is required' })}
                className="input-field mt-1"
                placeholder="64"
              />
              {errors.baseExperience && (
                <p className="mt-1 text-sm text-red-600">{errors.baseExperience.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sprite URL
              </label>
              <input
                type="url"
                {...register('spriteUrl')}
                className="input-field mt-1"
                placeholder="https://example.com/sprite.png"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">HP</label>
              <input
                type="number"
                {...register('hp', { required: 'HP is required' })}
                className="input-field mt-1"
                placeholder="45"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Attack</label>
              <input
                type="number"
                {...register('attack', { required: 'Attack is required' })}
                className="input-field mt-1"
                placeholder="49"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Defense</label>
              <input
                type="number"
                {...register('defense', { required: 'Defense is required' })}
                className="input-field mt-1"
                placeholder="49"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Special Attack</label>
              <input
                type="number"
                {...register('specialAttack', { required: 'Special Attack is required' })}
                className="input-field mt-1"
                placeholder="65"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Special Defense</label>
              <input
                type="number"
                {...register('specialDefense', { required: 'Special Defense is required' })}
                className="input-field mt-1"
                placeholder="65"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Speed</label>
              <input
                type="number"
                {...register('speed', { required: 'Speed is required' })}
                className="input-field mt-1"
                placeholder="45"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1"
            >
              {isLoading ? 'Adding...' : 'Add Pokémon'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/my-pokemon')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPokemon; 