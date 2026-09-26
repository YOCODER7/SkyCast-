package com.example.demo.Service;

import com.example.demo.Model.SearchHistory;
import com.example.demo.Repository.SearchHistoryRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SearchHistoryService {
    private  final SearchHistoryRepo searchHistoryRepo;

    public SearchHistoryService(SearchHistoryRepo searchHistoryRepo) {
        this.searchHistoryRepo = searchHistoryRepo;
    }
 //Adding
    public void saveSearch(String city){
        searchHistoryRepo.save(new SearchHistory(city));
 }
 //fetching
    public List<SearchHistory> getHistory(){
        return searchHistoryRepo.findAll();

    }

    //Deleting
    public void deleteHistory(String city){
        SearchHistory history = searchHistoryRepo.findByCityIgnoreCase(city).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Already Deleted"));
        searchHistoryRepo.delete(history);
    }





}
