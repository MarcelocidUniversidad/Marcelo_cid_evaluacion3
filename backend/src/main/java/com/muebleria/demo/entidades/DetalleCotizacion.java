package com.muebleria.demo.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "detalle_cotizaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleCotizacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "cotizacion_id", nullable = false)
    private Cotizacion cotizacion;
    
    @ManyToOne
    @JoinColumn(name = "mueble_id", nullable = false)
    private Mueble mueble;
    
    @ManyToOne
    @JoinColumn(name = "variante_id")
    private Variante variante;
    
    @Column(nullable = false)
    private Integer cantidad;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal precioUnitario;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal subtotal;
}
