package com.muebleria.demo.servicios;

import com.muebleria.demo.entidades.EstadoMueble;
import com.muebleria.demo.entidades.Mueble;
import com.muebleria.demo.repositorios.MuebleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MuebleService {
    
    @Autowired
    private MuebleRepository muebleRepository;
    
    public Mueble crearMueble(Mueble mueble) {
        mueble.setEstado(EstadoMueble.ACTIVO);
        return muebleRepository.save(mueble);
    }
    
    public List<Mueble> listarTodos() {
        return muebleRepository.findAll();
    }
    
    public List<Mueble> listarActivos() {
        return muebleRepository.findByEstado(EstadoMueble.ACTIVO);
    }
    
    public Optional<Mueble> buscarPorId(Long id) {
        return muebleRepository.findById(id);
    }
    
    public Mueble actualizarMueble(Long id, Mueble muebleActualizado) {
        return muebleRepository.findById(id)
                .map(mueble -> {
                    mueble.setNombre(muebleActualizado.getNombre());
                    mueble.setTipo(muebleActualizado.getTipo());
                    mueble.setPrecioBase(muebleActualizado.getPrecioBase());
                    mueble.setStock(muebleActualizado.getStock());
                    mueble.setTamanio(muebleActualizado.getTamanio());
                    mueble.setMaterial(muebleActualizado.getMaterial());
                    return muebleRepository.save(mueble);
                })
                .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));
    }
    
    public void desactivarMueble(Long id) {
        muebleRepository.findById(id)
                .ifPresent(mueble -> {
                    mueble.setEstado(EstadoMueble.INACTIVO);
                    muebleRepository.save(mueble);
                });
    }
    
    public boolean verificarStock(Long muebleId, Integer cantidad) {
        return muebleRepository.findById(muebleId)
                .map(mueble -> mueble.getStock() >= cantidad)
                .orElse(false);
    }
    
    public void reducirStock(Long muebleId, Integer cantidad) {
        muebleRepository.findById(muebleId)
                .ifPresent(mueble -> {
                    mueble.setStock(mueble.getStock() - cantidad);
                    muebleRepository.save(mueble);
                });
    }
}