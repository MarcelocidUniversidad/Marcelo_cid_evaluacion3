package com.muebleria.demo.servicios;

import com.muebleria.demo.entidades.*;
import com.muebleria.demo.repositorios.CotizacionRepository;
import com.muebleria.demo.repositorios.MuebleRepository;
import com.muebleria.demo.repositorios.VarianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class CotizacionService {
    
    @Autowired
    private CotizacionRepository cotizacionRepository;
    
    @Autowired
    private MuebleRepository muebleRepository;
    
    @Autowired
    private VarianteRepository varianteRepository;
    
    @Autowired
    private MuebleService muebleService;
    
    @Autowired
    private PrecioService precioService;
    
    @Transactional
    public Cotizacion crearCotizacion(Cotizacion cotizacion) {
        BigDecimal total = BigDecimal.ZERO;
        
        for (DetalleCotizacion detalle : cotizacion.getDetalles()) {
            Mueble mueble = muebleRepository.findById(detalle.getMueble().getId())
                    .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));
            
            BigDecimal precioVariante = BigDecimal.ZERO;
            if (detalle.getVariante() != null) {
                Variante variante = varianteRepository.findById(detalle.getVariante().getId())
                        .orElseThrow(() -> new RuntimeException("Variante no encontrada"));
                precioVariante = variante.getPrecioAdicional();
            }
            
            BigDecimal precioUnitario = precioService.calcularPrecioFinal(
                    mueble.getPrecioBase(), precioVariante);
            BigDecimal subtotal = precioUnitario.multiply(new BigDecimal(detalle.getCantidad()));
            
            detalle.setPrecioUnitario(precioUnitario);
            detalle.setSubtotal(subtotal);
            detalle.setCotizacion(cotizacion);
            
            total = total.add(subtotal);
        }
        
        cotizacion.setTotal(total);
        return cotizacionRepository.save(cotizacion);
    }
    
    @Transactional
    public Cotizacion confirmarVenta(Long cotizacionId) {
        Cotizacion cotizacion = cotizacionRepository.findById(cotizacionId)
                .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));
        
        // Verificar stock
        for (DetalleCotizacion detalle : cotizacion.getDetalles()) {
            if (!muebleService.verificarStock(detalle.getMueble().getId(), detalle.getCantidad())) {
                throw new RuntimeException("Stock insuficiente para el mueble: " + 
                        detalle.getMueble().getNombre());
            }
        }
        
        // Reducir stock
        for (DetalleCotizacion detalle : cotizacion.getDetalles()) {
            muebleService.reducirStock(detalle.getMueble().getId(), detalle.getCantidad());
        }
        
        cotizacion.setEstado(EstadoCotizacion.CONFIRMADA);
        return cotizacionRepository.save(cotizacion);
    }
    
    public List<Cotizacion> listarTodas() {
        return cotizacionRepository.findAll();
    }
    
    public Cotizacion buscarPorId(Long id) {
        return cotizacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));
    }
}