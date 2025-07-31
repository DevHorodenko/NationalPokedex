package com.nationalpokedex.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nationalpokedex.api.dto.PokemonDto;
import com.nationalpokedex.api.model.Pokemon;
import com.nationalpokedex.api.service.PokemonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PokemonController.class)
class PokemonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PokemonService pokemonService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void getAllPokemons_ShouldReturnPokemons() throws Exception {
        PokemonDto pokemon1 = new PokemonDto(1L, 1, "Bulbasaur", "A grass type Pokemon", 0.7, 6.9, 64, 
                new HashSet<>(Arrays.asList("Grass", "Poison")), new HashSet<>(Arrays.asList("Overgrow")), 
                45, 49, 49, 65, 65, 45, "image1.jpg", "sprite1.jpg", 1L, null, null);
        
        PokemonDto pokemon2 = new PokemonDto(2L, 2, "Ivysaur", "A grass type Pokemon", 1.0, 13.0, 142, 
                new HashSet<>(Arrays.asList("Grass", "Poison")), new HashSet<>(Arrays.asList("Overgrow")), 
                60, 62, 63, 80, 80, 60, "image2.jpg", "sprite2.jpg", 1L, null, null);

        Page<PokemonDto> pokemonPage = new PageImpl<>(Arrays.asList(pokemon1, pokemon2));
        when(pokemonService.getAllPokemonsPaginated(any(Pageable.class))).thenReturn(pokemonPage);

        mockMvc.perform(get("/pokemons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content.length()").value(2))
                .andExpect(jsonPath("$.content[0].name").value("Bulbasaur"))
                .andExpect(jsonPath("$.content[1].name").value("Ivysaur"));
    }

    @Test
    @WithMockUser
    void getPokemonById_ShouldReturnPokemon() throws Exception {
        PokemonDto pokemon = new PokemonDto(1L, 1, "Bulbasaur", "A grass type Pokemon", 0.7, 6.9, 64, 
                new HashSet<>(Arrays.asList("Grass", "Poison")), new HashSet<>(Arrays.asList("Overgrow")), 
                45, 49, 49, 65, 65, 45, "image1.jpg", "sprite1.jpg", 1L, null, null);
        
        when(pokemonService.getPokemonById(1L)).thenReturn(Optional.of(pokemon));

        mockMvc.perform(get("/pokemons/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Bulbasaur"))
                .andExpect(jsonPath("$.pokemonNumber").value(1));
    }

    @Test
    @WithMockUser
    void getPokemonById_ShouldReturnNotFound() throws Exception {
        when(pokemonService.getPokemonById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/pokemons/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    void createPokemon_ShouldReturnCreatedPokemon() throws Exception {
        Pokemon pokemonToCreate = new Pokemon();
        pokemonToCreate.setPokemonNumber(1);
        pokemonToCreate.setName("Bulbasaur");
        pokemonToCreate.setDescription("A grass type Pokemon");

        PokemonDto createdPokemon = new PokemonDto(1L, 1, "Bulbasaur", "A grass type Pokemon", 0.7, 6.9, 64, 
                new HashSet<>(Arrays.asList("Grass", "Poison")), new HashSet<>(Arrays.asList("Overgrow")), 
                45, 49, 49, 65, 65, 45, "image1.jpg", "sprite1.jpg", 1L, null, null);

        when(pokemonService.createPokemon(any(Pokemon.class), any(Long.class))).thenReturn(createdPokemon);

        mockMvc.perform(post("/pokemons")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pokemonToCreate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Bulbasaur"));
    }
} 