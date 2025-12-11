package com.muebleria.demo.servicios.strategy;

import java.math.BigDecimal;

public class PrecioNormalStrategy implements PrecioStrategy {
    
    @Override
    public BigDecimal calcularPrecio(BigDecimal precioBase, BigDecimal precioVariante) {
        return precioBase;
    }
    
    @Override
    public String getDescripcion() {
        return "Precio normal sin variantes";
    }
}