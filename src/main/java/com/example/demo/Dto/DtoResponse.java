package com.example.demo.Dto;



    public record DtoResponse(
            String city,
            double temperature,
            double windspeed,
            int humidity,
            String description
    ) {}



