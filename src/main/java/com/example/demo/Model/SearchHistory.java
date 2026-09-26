package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Entity

public class SearchHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Setter
    @Column( nullable = false,length = 100)
    private String city;
    @Column( nullable = false)
    private LocalDateTime searchAt;
public SearchHistory(){}
    public SearchHistory(String city) {
        this.city = city;
    }

    @PrePersist
public void setSearchAt() {
        this.searchAt = LocalDateTime.now();

}
}
