package ru.aylivdele.clothes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String article;

    private Float price;

    @Column(name = "category_id")
    private Long category;

    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.DETACH})
    private Collection<Image> images;

    @OneToMany(mappedBy = "item", cascade = {CascadeType.REMOVE, CascadeType.DETACH})
    private Collection<PropertyQuantity> properties;
}
