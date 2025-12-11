package com.muebleria.demo.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cotizaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cotizacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDateTime fecha;
    
    @Enumerated(EnumType.STRING)
    private EstadoCotizacion estado;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal total;
    
    @OneToMany(mappedBy = "cotizacion", cascade = CascadeType.ALL)
    private List<DetalleCotizacion> detalles = new ArrayList<>();
    
    @PrePersist
    public void prePersist() {
        this.fecha = LocalDateTime.now();
        this.estado = EstadoCotizacion.PENDIENTE;
    }
}