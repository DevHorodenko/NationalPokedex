package com.nationalpokedex.api.repository;

import com.nationalpokedex.api.model.Pokemon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
    
    Optional<Pokemon> findByPokemonNumber(Integer pokemonNumber);
    
    List<Pokemon> findByTypesContaining(String type);
    
    List<Pokemon> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT p FROM Pokemon p WHERE p.user.id = :userId")
    Page<Pokemon> findByUserId(@Param("userId") Long userId, Pageable pageable);
    
    @Query("SELECT p FROM Pokemon p WHERE p.pokemonNumber BETWEEN :start AND :end")
    List<Pokemon> findByPokemonNumberRange(@Param("start") Integer start, @Param("end") Integer end);
    
    boolean existsByPokemonNumber(Integer pokemonNumber);
} 