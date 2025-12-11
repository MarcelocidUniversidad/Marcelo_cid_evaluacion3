package com.muebleria.demo.servicios;

import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.*;

class PrecioServiceTest {
    
    private final PrecioService precioService = new PrecioService();
    
    @Test
    void testCalcularPrecioNormal() {
        BigDecimal precioBase = new BigDecimal("100.00");
        BigDecimal precioVariante = BigDecimal.ZERO;
        
        BigDecimal resultado = precioService.calcularPrecioFinal(precioBase, precioVariante);
        
        assertEquals(new BigDecimal("100.00"), resultado);
    }
    
    @Test
    void testCalcularPrecioConVariante() {
        BigDecimal precioBase = new BigDecimal("100.00");
        BigDecimal precioVariante = new BigDecimal("50.00");
        
        BigDecimal resultado = precioService.calcularPrecioFinal(precioBase, precioVariante);
        
        assertEquals(new BigDecimal("150.00"), resultado);
    }
    
    @Test
    void testCalcularPrecioConVarianteNull() {
        BigDecimal precioBase = new BigDecimal("100.00");
        
        BigDecimal resultado = precioService.calcularPrecioFinal(precioBase, null);
        
        assertEquals(new BigDecimal("100.00"), resultado);
    }
}
