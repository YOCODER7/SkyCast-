package com.example.demo.Dto;

public record HourlyForecastResponse (
        long timestamp,
        double temperature
) {}
