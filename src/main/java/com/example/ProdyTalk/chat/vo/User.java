package com.example.ProdyTalk.chat.vo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="user")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "description")
    private String description;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private Set<Conversation> conversations = new HashSet<>();


    public User() {
        super();
    }

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}