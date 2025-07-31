package com.nationalpokedex.api.service;

import com.nationalpokedex.api.dto.PokemonDto;
import com.nationalpokedex.api.model.Pokemon;
import com.nationalpokedex.api.model.User;
import com.nationalpokedex.api.repository.PokemonRepository;
import com.nationalpokedex.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PokemonService {

    private final PokemonRepository pokemonRepository;
    private final UserRepository userRepository;

    public List<PokemonDto> getAllPokemons() {
        return pokemonRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Page<PokemonDto> getAllPokemonsPaginated(Pageable pageable) {
        return pokemonRepository.findAll(pageable)
                .map(this::convertToDto);
    }

    public Optional<PokemonDto> getPokemonById(Long id) {
        return pokemonRepository.findById(id)
                .map(this::convertToDto);
    }

    public Optional<PokemonDto> getPokemonByNumber(Integer pokemonNumber) {
        return pokemonRepository.findByPokemonNumber(pokemonNumber)
                .map(this::convertToDto);
    }

    public List<PokemonDto> getPokemonsByType(String type) {
        return pokemonRepository.findByTypesContaining(type).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PokemonDto> searchPokemonsByName(String name) {
        return pokemonRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Page<PokemonDto> getPokemonsByUserId(Long userId, Pageable pageable) {
        return pokemonRepository.findByUserId(userId, pageable)
                .map(this::convertToDto);
    }

    public Page<PokemonDto> getPokemonsByUsername(String username, Pageable pageable) {
        return pokemonRepository.findByUserUsername(username, pageable)
                .map(this::convertToDto);
    }

    public List<PokemonDto> getPokemonsByNumberRange(Integer start, Integer end) {
        return pokemonRepository.findByPokemonNumberRange(start, end).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PokemonDto createPokemon(Pokemon pokemon, Long userId) {
        if (pokemonRepository.existsByPokemonNumber(pokemon.getPokemonNumber())) {
            throw new RuntimeException("Pokemon with this number already exists");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        pokemon.setUser(user);
        Pokemon savedPokemon = pokemonRepository.save(pokemon);
        log.info("Created new Pokemon: {} (Number: {})", savedPokemon.getName(), savedPokemon.getPokemonNumber());
        return convertToDto(savedPokemon);
    }

    public PokemonDto createPokemon(Pokemon pokemon, String username) {
        if (pokemonRepository.existsByPokemonNumber(pokemon.getPokemonNumber())) {
            throw new RuntimeException("Pokemon with this number already exists");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        pokemon.setUser(user);
        Pokemon savedPokemon = pokemonRepository.save(pokemon);
        log.info("Created new Pokemon: {} (Number: {}) by user: {}", savedPokemon.getName(), savedPokemon.getPokemonNumber(), username);
        return convertToDto(savedPokemon);
    }

    public Optional<PokemonDto> updatePokemon(Long id, Pokemon pokemonDetails) {
        return pokemonRepository.findById(id)
                .map(pokemon -> {
                    pokemon.setName(pokemonDetails.getName());
                    pokemon.setDescription(pokemonDetails.getDescription());
                    pokemon.setHeightM(pokemonDetails.getHeightM());
                    pokemon.setWeightKg(pokemonDetails.getWeightKg());
                    pokemon.setBaseExperience(pokemonDetails.getBaseExperience());
                    pokemon.setTypes(pokemonDetails.getTypes());
                    pokemon.setAbilities(pokemonDetails.getAbilities());
                    pokemon.setHp(pokemonDetails.getHp());
                    pokemon.setAttack(pokemonDetails.getAttack());
                    pokemon.setDefense(pokemonDetails.getDefense());
                    pokemon.setSpecialAttack(pokemonDetails.getSpecialAttack());
                    pokemon.setSpecialDefense(pokemonDetails.getSpecialDefense());
                    pokemon.setSpeed(pokemonDetails.getSpeed());
                    pokemon.setImageUrl(pokemonDetails.getImageUrl());
                    pokemon.setSpriteUrl(pokemonDetails.getSpriteUrl());
                    
                    Pokemon updatedPokemon = pokemonRepository.save(pokemon);
                    log.info("Updated Pokemon: {} (Number: {})", updatedPokemon.getName(), updatedPokemon.getPokemonNumber());
                    return convertToDto(updatedPokemon);
                });
    }

    public boolean deletePokemon(Long id) {
        if (pokemonRepository.existsById(id)) {
            pokemonRepository.deleteById(id);
            log.info("Deleted Pokemon with id: {}", id);
            return true;
        }
        return false;
    }

    private PokemonDto convertToDto(Pokemon pokemon) {
        return new PokemonDto(
                pokemon.getId(),
                pokemon.getPokemonNumber(),
                pokemon.getName(),
                pokemon.getDescription(),
                pokemon.getHeightM(),
                pokemon.getWeightKg(),
                pokemon.getBaseExperience(),
                pokemon.getTypes(),
                pokemon.getAbilities(),
                pokemon.getHp(),
                pokemon.getAttack(),
                pokemon.getDefense(),
                pokemon.getSpecialAttack(),
                pokemon.getSpecialDefense(),
                pokemon.getSpeed(),
                pokemon.getImageUrl(),
                pokemon.getSpriteUrl(),
                pokemon.getUser() != null ? pokemon.getUser().getId() : null,
                pokemon.getCreatedAt(),
                pokemon.getUpdatedAt()
        );
    }
} 