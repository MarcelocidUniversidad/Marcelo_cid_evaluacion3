package com.muebleria.demo.controladores;

import com.muebleria.demo.entidades.Cotizacion;
import com.muebleria.demo.servicios.CotizacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cotizaciones")
public class CotizacionController {
    
    @Autowired
    private CotizacionService cotizacionService;
    
    @PostMapping
    public ResponseEntity<Cotizacion> crear(@RequestBody Cotizacion cotizacion) {
        return new ResponseEntity<>(cotizacionService.crearCotizacion(cotizacion), 
                HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Cotizacion>> listarTodas() {
        return ResponseEntity.ok(cotizacionService.listarTodas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Cotizacion> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(cotizacionService.buscarPorId(id));
    }
    
    @PostMapping("/{id}/confirmar")
    public ResponseEntity<Cotizacion> confirmarVenta(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(cotizacionService.confirmarVenta(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
