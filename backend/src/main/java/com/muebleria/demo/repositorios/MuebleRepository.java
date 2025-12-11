package com.muebleria.demo.repositorios;

import com.muebleria.demo.entidades.Mueble;
import com.muebleria.demo.entidades.EstadoMueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MuebleRepository extends JpaRepository<Mueble, Long> {
    List<Mueble> findByEstado(EstadoMueble estado);
    List<Mueble> findByTipo(String tipo);
}