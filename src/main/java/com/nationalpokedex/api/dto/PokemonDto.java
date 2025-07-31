package com.nationalpokedex.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PokemonDto {
    private Long id;
    private Integer pokemonNumber;
    private String name;
    private String description;
    private Double heightM;
    private Double weightKg;
    private Integer baseExperience;
    private Set<String> types;
    private Set<String> abilities;
    private Integer hp;
    private Integer attack;
    private Integer defense;
    private Integer specialAttack;
    private Integer specialDefense;
    private Integer speed;
    private String imageUrl;
    private String spriteUrl;
    private Long userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 