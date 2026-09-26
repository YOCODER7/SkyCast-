package com.example.demo.Controller;

import com.example.demo.Dto.DtoResponse;
import com.example.demo.Service.Weatherservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Weathercontroller {
@GetMapping("/Home")
public String weather(){
    return "HOME PAGE";
}
    @Autowired
    private Weatherservice weatherservice;
@GetMapping("/{city}")
public DtoResponse getWeather(@PathVariable String city){
        return weatherservice.getWeather(city);
}

}

