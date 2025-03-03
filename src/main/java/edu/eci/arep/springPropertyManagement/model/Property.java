package edu.eci.arep.springPropertyManagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;
    private double price;
    private int size;
    private String description;
}
