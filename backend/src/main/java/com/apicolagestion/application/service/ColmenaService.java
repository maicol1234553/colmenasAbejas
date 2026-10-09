package com.apicolagestion.application.service;

import com.apicolagestion.application.dto.ChequeoGeneralDTO;
import com.apicolagestion.application.dto.RegistroCosechaDTO;
import com.apicolagestion.domain.entities.ChequeoGeneral;
import com.apicolagestion.domain.entities.RegistroCosecha;
import com.apicolagestion.infrastructure.repositories.ChequeoGeneralRepository;
import com.apicolagestion.infrastructure.repositories.RegistroCosechaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ColmenaService {

    private final ChequeoGeneralRepository chequeoRepository;
    private final RegistroCosechaRepository cosechaRepository;

    // ========== CHEQUEOS GENERALES ==========

    @Transactional
    public ChequeoGeneralDTO crearChequeo(Integer colmenaId, ChequeoGeneralDTO dto, Long usuarioId) {
        ChequeoGeneral entity = mapToEntity(dto);
        entity.setColmenaId(colmenaId);
        entity.setUsuarioId(usuarioId);
        ChequeoGeneral guardado = chequeoRepository.save(entity);
        return mapToDTO(guardado);
    }

    public List<ChequeoGeneralDTO> listarChequeos(Integer colmenaId) {
        return chequeoRepository.findByColmenaIdOrderByFechaDesc(colmenaId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ========== REGISTROS COSECHA ==========

    @Transactional
    public RegistroCosechaDTO crearCosecha(Integer colmenaId, RegistroCosechaDTO dto, Long usuarioId) {
        RegistroCosecha entity = mapToEntity(dto);
        entity.setColmenaId(colmenaId);
        entity.setUsuarioId(usuarioId);
        RegistroCosecha guardado = cosechaRepository.save(entity);
        return mapToDTO(guardado);
    }

    public List<RegistroCosechaDTO> listarCosechas(Integer colmenaId) {
        return cosechaRepository.findByColmenaIdOrderByFechaDesc(colmenaId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ========== MAPPERS ==========

    private ChequeoGeneral mapToEntity(ChequeoGeneralDTO dto) {
        return ChequeoGeneral.builder()
                .id(dto.getId())
                .colmenaId(dto.getColmenaId())
                .fecha(dto.getFecha())
                .alza(dto.getAlza())
                .cuadro(dto.getCuadro())
                .temperamento(dto.getTemperamento())
                .poblacion(dto.getPoblacion())
                .presenciaMiel(dto.getPresenciaMiel())
                .presenciaPanAbeja(dto.getPresenciaPanAbeja())
                .presenciaCriaOperculada(dto.getPresenciaCriaOperculada())
                .presenciaCriaAbierta(dto.getPresenciaCriaAbierta())
                .porcentajeCuadro(dto.getPorcentajeCuadro())
                .reinas(dto.getReinas())
                .reservaAlimento(dto.getReservaAlimento())
                .alimentacionArtificial(dto.getAlimentacionArtificial())
                .comportamientoHigienico(dto.getComportamientoHigienico())
                .estadoSanitario(dto.getEstadoSanitario())
                .observaciones(dto.getObservaciones())
                .build();
    }

    private ChequeoGeneralDTO mapToDTO(ChequeoGeneral entity) {
        return ChequeoGeneralDTO.builder()
                .id(entity.getId())
                .colmenaId(entity.getColmenaId())
                .fecha(entity.getFecha())
                .alza(entity.getAlza())
                .cuadro(entity.getCuadro())
                .temperamento(entity.getTemperamento())
                .poblacion(entity.getPoblacion())
                .presenciaMiel(entity.getPresenciaMiel())
                .presenciaPanAbeja(entity.getPresenciaPanAbeja())
                .presenciaCriaOperculada(entity.getPresenciaCriaOperculada())
                .presenciaCriaAbierta(entity.getPresenciaCriaAbierta())
                .porcentajeCuadro(entity.getPorcentajeCuadro())
                .reinas(entity.getReinas())
                .reservaAlimento(entity.getReservaAlimento())
                .alimentacionArtificial(entity.getAlimentacionArtificial())
                .comportamientoHigienico(entity.getComportamientoHigienico())
                .estadoSanitario(entity.getEstadoSanitario())
                .observaciones(entity.getObservaciones())
                .build();
    }

    private RegistroCosecha mapToEntity(RegistroCosechaDTO dto) {
        return RegistroCosecha.builder()
                .id(dto.getId())
                .colmenaId(dto.getColmenaId())
                .fecha(dto.getFecha())
                .alza(dto.getAlza())
                .cuadro(dto.getCuadro())
                .metodoExtraccion(dto.getMetodoExtraccion())
                .cuadroReemplazo(dto.getCuadroReemplazo())
                .cuadrosFaltantesConCera(dto.getCuadrosFaltantesConCera())
                .cuadrosFaltantesSinCera(dto.getCuadrosFaltantesSinCera())
                .build();
    }

    private RegistroCosechaDTO mapToDTO(RegistroCosecha entity) {
        return RegistroCosechaDTO.builder()
                .id(entity.getId())
                .colmenaId(entity.getColmenaId())
                .fecha(entity.getFecha())
                .alza(entity.getAlza())
                .cuadro(entity.getCuadro())
                .metodoExtraccion(entity.getMetodoExtraccion())
                .cuadroReemplazo(entity.getCuadroReemplazo())
                .cuadrosFaltantesConCera(entity.getCuadrosFaltantesConCera())
                .cuadrosFaltantesSinCera(entity.getCuadrosFaltantesSinCera())
                .build();
    }
}
