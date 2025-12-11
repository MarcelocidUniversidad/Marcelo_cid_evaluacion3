package com.muebleria.demo.servicios.strategy;

import java.math.BigDecimal;

public class PrecioConVarianteStrategy implements PrecioStrategy {
    
    @Override
    public BigDecimal calcularPrecio(BigDecimal precioBase, BigDecimal precioVariante) {
        return precioBase.add(precioVariante);
    }
    
    @Override
    public String getDescripcion() {
        return "Precio con variante premium";
    }
}