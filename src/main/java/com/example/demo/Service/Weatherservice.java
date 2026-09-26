package com.example.demo.Service;

import com.example.demo.Dto.DtoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class Weatherservice {
   private final RestTemplate restTemplate;
   private final  ObjectMapper objectMapper;
private final SearchHistoryService searchHistoryService;
   public Weatherservice(RestTemplate restTemplate, ObjectMapper objectMapper, SearchHistoryService searchHistoryService) {
       this.objectMapper = objectMapper;
       this.restTemplate = restTemplate;
       this.searchHistoryService = searchHistoryService;
   }
@Value("${weather.api.key}")
    private String apiKey;
@Value("${weather.api.url}")
    private String apiUrl;
//Making of the url
public DtoResponse getWeather(String city){
String url= UriComponentsBuilder.fromUriString(apiUrl+"/weather")
        .queryParam("q",city)
        .queryParam("appid",apiKey)
        .queryParam("units","metric")
        .toUriString();
String response=restTemplate.getForObject(url,String.class);
try {
    JsonNode jsonNode = objectMapper.readTree(response);
    JsonNode weatherarray = jsonNode.path("weather");
    JsonNode firstWeather = weatherarray.get(0);

  DtoResponse WeatherResponse =   new DtoResponse(
            jsonNode.path("name").asText(),
            jsonNode.path("main").path("temp").asDouble(),
            jsonNode.path("wind").path("speed").asDouble(),
            jsonNode.path("main").path("humidity").asInt(),
            firstWeather.path("description").asText()

    );
 searchHistoryService.saveSearch(WeatherResponse.city());
 return WeatherResponse;

} catch (Exception e) {
        throw new RuntimeException("Error getting weather data",e);
}
}

}




