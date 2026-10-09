package com.apicolagestion.application.controller;

import com.apicolagestion.application.dto.ChequeoGeneralDTO;
import com.apicolagestion.application.dto.RegistroCosechaDTO;
import com.apicolagestion.application.service.ColmenaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colmenas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ColmenaController {

    private final ColmenaService colmenaService;

    // ========== CHEQUEOS GENERALES ==========

    @PostMapping("/{colmenaId}/chequeos")
    public ResponseEntity<ChequeoGeneralDTO> crearChequeo(
            @PathVariable Integer colmenaId,
            @RequestBody ChequeoGeneralDTO dto,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(colmenaService.crearChequeo(colmenaId, dto, usuarioId));
    }

    @GetMapping("/{colmenaId}/chequeos")
    public ResponseEntity<List<ChequeoGeneralDTO>> listarChequeos(
            @PathVariable Integer colmenaId) {
        return ResponseEntity.ok(colmenaService.listarChequeos(colmenaId));
    }

    // ========== REGISTROS COSECHA ==========

    @PostMapping("/{colmenaId}/cosechas")
    public ResponseEntity<RegistroCosechaDTO> crearCosecha(
            @PathVariable Integer colmenaId,
            @RequestBody RegistroCosechaDTO dto,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(colmenaService.crearCosecha(colmenaId, dto, usuarioId));
    }

    @GetMapping("/{colmenaId}/cosechas")
    public ResponseEntity<List<RegistroCosechaDTO>> listarCosechas(
            @PathVariable Integer colmenaId) {
        return ResponseEntity.ok(colmenaService.listarCosechas(colmenaId));
    }
}
