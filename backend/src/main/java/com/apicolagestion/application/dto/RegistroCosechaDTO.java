package com.apicolagestion.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistroCosechaDTO {
    private Long id;
    private Integer colmenaId;
    private LocalDate fecha;
    private String alza;
    private Integer cuadro;
    private String metodoExtraccion;
    private String cuadroReemplazo;
    private Integer cuadrosFaltantesConCera;
    private Integer cuadrosFaltantesSinCera;
}
