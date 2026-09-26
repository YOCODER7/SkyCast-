package com.example.demo.Dto;

import jakarta.validation.constraints.NotBlank;

public record FavouriteRequest(
        @NotBlank( message = "City is required")
        String city
) {}

