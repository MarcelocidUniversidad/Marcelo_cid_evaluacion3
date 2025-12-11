package com.muebleria.demo.repositorios;

import com.muebleria.demo.entidades.Cotizacion;
import com.muebleria.demo.entidades.EstadoCotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CotizacionRepository extends JpaRepository<Cotizacion, Long> {
    List<Cotizacion> findByEstado(EstadoCotizacion estado);
}