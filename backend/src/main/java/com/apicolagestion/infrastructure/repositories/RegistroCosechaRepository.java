package com.apicolagestion.infrastructure.repositories;

import com.apicolagestion.domain.entities.RegistroCosecha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistroCosechaRepository extends JpaRepository<RegistroCosecha, Long> {
    List<RegistroCosecha> findByColmenaIdOrderByFechaDesc(Integer colmenaId);
    List<RegistroCosecha> findAllByOrderByFechaDesc();
}
