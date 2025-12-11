package com.muebleria.demo.servicios.strategy;

import java.math.BigDecimal;

public interface PrecioStrategy {
    BigDecimal calcularPrecio(BigDecimal precioBase, BigDecimal precioVariante);
    String getDescripcion();
}