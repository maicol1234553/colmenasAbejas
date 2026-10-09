package com.apicolagestion.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChequeoGeneralDTO {
    private Long id;
    private Integer colmenaId;
    private LocalDate fecha;
    private String alza;
    private Integer cuadro;
    private String temperamento;
    private String poblacion;
    private String presenciaMiel;
    private String presenciaPanAbeja;
    private String presenciaCriaOperculada;
    private String presenciaCriaAbierta;
    private BigDecimal porcentajeCuadro;
    private String reinas;
    private String reservaAlimento;
    private String alimentacionArtificial;
    private String comportamientoHigienico;
    private String estadoSanitario;
    private String observaciones;
}
