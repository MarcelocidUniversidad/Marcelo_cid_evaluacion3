package com.muebleria.demo.entidades;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "muebles")
@Data
public class Mueble {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String tipo;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precioBase;
    
    @Column(nullable = false)
    private Integer stock;
    
    @Enumerated(EnumType.STRING)
    private EstadoMueble estado;
    
    @Enumerated(EnumType.STRING)
    private Tamanio tamanio;
    
    @Column(nullable = false)
    private String material;
}
