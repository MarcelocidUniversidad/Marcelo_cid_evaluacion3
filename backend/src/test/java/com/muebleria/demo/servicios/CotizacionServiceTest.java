package com.muebleria.demo.servicios;

import com.muebleria.demo.entidades.*;
import com.muebleria.demo.repositorios.CotizacionRepository;
import com.muebleria.demo.repositorios.MuebleRepository;
import com.muebleria.demo.repositorios.VarianteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.math.BigDecimal;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class CotizacionServiceTest {
    
    @Mock
    private CotizacionRepository cotizacionRepository;
    
    @Mock
    private MuebleRepository muebleRepository;
    
    @Mock
    private VarianteRepository varianteRepository;
    
    @Mock
    private MuebleService muebleService;
    
    @Mock
    private PrecioService precioService;
    
    @InjectMocks
    private CotizacionService cotizacionService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    void testConfirmarVentaConStockSuficiente() {
        Mueble mueble = new Mueble();
        mueble.setId(1L);
        mueble.setNombre("Silla");
        mueble.setStock(10);
        
        DetalleCotizacion detalle = new DetalleCotizacion();
        detalle.setMueble(mueble);
        detalle.setCantidad(5);
        
        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setId(1L);
        cotizacion.getDetalles().add(detalle);
        
        when(cotizacionRepository.findById(1L)).thenReturn(Optional.of(cotizacion));
        when(muebleService.verificarStock(1L, 5)).thenReturn(true);
        when(cotizacionRepository.save(any(Cotizacion.class))).thenReturn(cotizacion);
        
        Cotizacion resultado = cotizacionService.confirmarVenta(1L);
        
        assertEquals(EstadoCotizacion.CONFIRMADA, resultado.getEstado());
        verify(muebleService, times(1)).reducirStock(1L, 5);
    }
    
    @Test
    void testConfirmarVentaConStockInsuficiente() {
        Mueble mueble = new Mueble();
        mueble.setId(1L);
        mueble.setNombre("Silla");
        mueble.setStock(3);
        
        DetalleCotizacion detalle = new DetalleCotizacion();
        detalle.setMueble(mueble);
        detalle.setCantidad(5);
        
        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setId(1L);
        cotizacion.getDetalles().add(detalle);
        
        when(cotizacionRepository.findById(1L)).thenReturn(Optional.of(cotizacion));
        when(muebleService.verificarStock(1L, 5)).thenReturn(false);
        
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            cotizacionService.confirmarVenta(1L);
        });
        
        assertTrue(exception.getMessage().contains("Stock insuficiente"));
        verify(muebleService, never()).reducirStock(anyLong(), anyInt());
    }
}
