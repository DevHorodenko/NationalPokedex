package com.nationalpokedex.api.controller;

import com.nationalpokedex.api.dto.PokemonDto;
import com.nationalpokedex.api.model.Pokemon;
import com.nationalpokedex.api.service.PokemonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemons")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Pokemons", description = "Pokemon management APIs")
public class PokemonController {

    private final PokemonService pokemonService;

    @GetMapping
    @Operation(summary = "Get all pokemons", description = "Retrieve all pokemons with pagination")
    public ResponseEntity<Page<PokemonDto>> getAllPokemons(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(pokemonService.getAllPokemonsPaginated(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get pokemon by ID", description = "Retrieve a specific pokemon by their ID")
    public ResponseEntity<PokemonDto> getPokemonById(@PathVariable Long id) {
        return pokemonService.getPokemonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/number/{pokemonNumber}")
    @Operation(summary = "Get pokemon by number", description = "Retrieve a specific pokemon by their number")
    public ResponseEntity<PokemonDto> getPokemonByNumber(@PathVariable Integer pokemonNumber) {
        return pokemonService.getPokemonByNumber(pokemonNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    @Operation(summary = "Get pokemons by type", description = "Retrieve all pokemons of a specific type")
    public ResponseEntity<List<PokemonDto>> getPokemonsByType(@PathVariable String type) {
        return ResponseEntity.ok(pokemonService.getPokemonsByType(type));
    }

    @GetMapping("/search")
    @Operation(summary = "Search pokemons by name", description = "Search pokemons by name (case-insensitive)")
    public ResponseEntity<List<PokemonDto>> searchPokemonsByName(
            @Parameter(description = "Pokemon name to search for") @RequestParam String name) {
        return ResponseEntity.ok(pokemonService.searchPokemonsByName(name));
    }

    @GetMapping("/range")
    @Operation(summary = "Get pokemons by number range", description = "Retrieve pokemons within a number range")
    public ResponseEntity<List<PokemonDto>> getPokemonsByNumberRange(
            @Parameter(description = "Start number") @RequestParam Integer start,
            @Parameter(description = "End number") @RequestParam Integer end) {
        return ResponseEntity.ok(pokemonService.getPokemonsByNumberRange(start, end));
    }

    @GetMapping("/my-pokemons")
    @Operation(summary = "Get user's pokemons", description = "Retrieve all pokemons owned by the current user")
    public ResponseEntity<Page<PokemonDto>> getMyPokemons(
            @PageableDefault(size = 20) Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // In a real application, you would get the user ID from the authentication
        // For now, we'll use a placeholder
        Long userId = 1L; // This should be extracted from the authentication
        return ResponseEntity.ok(pokemonService.getPokemonsByUserId(userId, pageable));
    }

    @PostMapping
    @Operation(summary = "Create pokemon", description = "Create a new pokemon")
    public ResponseEntity<PokemonDto> createPokemon(@Valid @RequestBody Pokemon pokemon) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // In a real application, you would get the user ID from the authentication
        // For now, we'll use a placeholder
        Long userId = 1L; // This should be extracted from the authentication
        PokemonDto createdPokemon = pokemonService.createPokemon(pokemon, userId);
        return ResponseEntity.ok(createdPokemon);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update pokemon", description = "Update pokemon information")
    public ResponseEntity<PokemonDto> updatePokemon(@PathVariable Long id, @Valid @RequestBody Pokemon pokemonDetails) {
        return pokemonService.updatePokemon(id, pokemonDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete pokemon", description = "Delete a pokemon")
    public ResponseEntity<Void> deletePokemon(@PathVariable Long id) {
        if (pokemonService.deletePokemon(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
} 