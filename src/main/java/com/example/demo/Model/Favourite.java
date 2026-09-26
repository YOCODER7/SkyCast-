package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
public class Favourite {
    @Id
    @GeneratedValue
private long id;
    @Getter
    @Column(nullable = false,length = 100)
private String city;
@Getter
public LocalDateTime createdAt;

public Favourite(){}
@PrePersist
public void setCreatedAt() {
    this.createdAt = LocalDateTime.now();
}
    public Favourite(String city){
        this.city = city;
    }
    public Long getId(){
    return id;
    }
}

