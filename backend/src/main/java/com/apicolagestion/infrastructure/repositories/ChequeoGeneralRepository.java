package com.apicolagestion.infrastructure.repositories;

import com.apicolagestion.domain.entities.ChequeoGeneral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChequeoGeneralRepository extends JpaRepository<ChequeoGeneral, Long> {
    List<ChequeoGeneral> findByColmenaIdOrderByFechaDesc(Integer colmenaId);
    List<ChequeoGeneral> findAllByOrderByFechaDesc();
}
