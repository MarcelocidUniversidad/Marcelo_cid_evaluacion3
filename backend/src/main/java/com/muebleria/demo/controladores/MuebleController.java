package com.muebleria.demo.controladores;


import com.muebleria.demo.entidades.Mueble;
import com.muebleria.demo.servicios.MuebleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/muebles")
public class MuebleController {
    
    @Autowired
    private MuebleService muebleService;
    
    @PostMapping
    public ResponseEntity<Mueble> crear(@RequestBody Mueble mueble) {
        return new ResponseEntity<>(muebleService.crearMueble(mueble), HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Mueble>> listarTodos() {
        return ResponseEntity.ok(muebleService.listarTodos());
    }
    
    @GetMapping("/activos")
    public ResponseEntity<List<Mueble>> listarActivos() {
        return ResponseEntity.ok(muebleService.listarActivos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Mueble> buscarPorId(@PathVariable Long id) {
        return muebleService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Mueble> actualizar(@PathVariable Long id, @RequestBody Mueble mueble) {
        return ResponseEntity.ok(muebleService.actualizarMueble(id, mueble));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desactivar(@PathVariable Long id) {
        muebleService.desactivarMueble(id);
        return ResponseEntity.noContent().build();
    }
}
