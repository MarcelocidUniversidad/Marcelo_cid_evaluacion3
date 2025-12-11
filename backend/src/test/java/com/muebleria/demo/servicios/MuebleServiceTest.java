package com.muebleria.demo.servicios;

import com.muebleria.demo.entidades.EstadoMueble;
import com.muebleria.demo.entidades.Mueble;
import com.muebleria.demo.entidades.Tamanio;
import com.muebleria.demo.repositorios.MuebleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.math.BigDecimal;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MuebleServiceTest {
    
    @Mock
    private MuebleRepository muebleRepository;
    
    @InjectMocks
    private MuebleService muebleService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    void testCrearMueble() {
        Mueble mueble = new Mueble();
        mueble.setNombre("Silla");
        mueble.setTipo("Silla");
        mueble.setPrecioBase(new BigDecimal("50.00"));
        mueble.setStock(10);
        mueble.setTamanio(Tamanio.MEDIANO);
        mueble.setMaterial("Madera");
        
        when(muebleRepository.save(any(Mueble.class))).thenReturn(mueble);
        
        Mueble resultado = muebleService.crearMueble(mueble);
        
        assertNotNull(resultado);
        assertEquals(EstadoMueble.ACTIVO, resultado.getEstado());
        verify(muebleRepository, times(1)).save(mueble);
    }
    
    @Test
    void testVerificarStockSuficiente() {
        Mueble mueble = new Mueble();
        mueble.setId(1L);
        mueble.setStock(10);
        
        when(muebleRepository.findById(1L)).thenReturn(Optional.of(mueble));
        
        boolean resultado = muebleService.verificarStock(1L, 5);
        
        assertTrue(resultado);
    }
    
    @Test
    void testVerificarStockInsuficiente() {
        Mueble mueble = new Mueble();
        mueble.setId(1L);
        mueble.setStock(3);
        
        when(muebleRepository.findById(1L)).thenReturn(Optional.of(mueble));
        
        boolean resultado = muebleService.verificarStock(1L, 5);
        
        assertFalse(resultado);
    }
    
    @Test
    void testDesactivarMueble() {
        Mueble mueble = new Mueble();
        mueble.setId(1L);
        mueble.setEstado(EstadoMueble.ACTIVO);
        
        when(muebleRepository.findById(1L)).thenReturn(Optional.of(mueble));
        when(muebleRepository.save(any(Mueble.class))).thenReturn(mueble);
        
        muebleService.desactivarMueble(1L);
        
        assertEquals(EstadoMueble.INACTIVO, mueble.getEstado());
        verify(muebleRepository, times(1)).save(mueble);
    }
}