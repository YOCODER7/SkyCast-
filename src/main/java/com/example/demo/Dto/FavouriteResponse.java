package com.example.demo.Dto;

import java.time.LocalDateTime;

public record FavouriteResponse(
        long id,
        String city,
        LocalDateTime createdAt
) {}

