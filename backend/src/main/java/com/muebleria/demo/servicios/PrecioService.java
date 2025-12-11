package com.muebleria.demo.servicios;

import com.muebleria.demo.servicios.strategy.PrecioConVarianteStrategy;
import com.muebleria.demo.servicios.strategy.PrecioNormalStrategy;
import com.muebleria.demo.servicios.strategy.PrecioStrategy;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class PrecioService {
    
    public BigDecimal calcularPrecioFinal(BigDecimal precioBase, BigDecimal precioVariante) {
        PrecioStrategy strategy;
        
        if (precioVariante == null || precioVariante.compareTo(BigDecimal.ZERO) == 0) {
            strategy = new PrecioNormalStrategy();
        } else {
            strategy = new PrecioConVarianteStrategy();
        }
        
        return strategy.calcularPrecio(precioBase, precioVariante);
    }
}