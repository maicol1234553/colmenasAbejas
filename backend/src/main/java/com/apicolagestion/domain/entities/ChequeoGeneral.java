package com.apicolagestion.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "chequeos_generales")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChequeoGeneral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer colmenaId;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false, length = 50)
    private String alza;

    @Column(nullable = false)
    private Integer cuadro;

    @Column(nullable = false, length = 50)
    private String temperamento;

    @Column(nullable = false, length = 50)
    private String poblacion;

    @Column(nullable = false, length = 50)
    private String presenciaMiel;

    @Column(nullable = false, length = 50)
    private String presenciaPanAbeja;

    @Column(nullable = false, length = 50)
    private String presenciaCriaOperculada;

    @Column(nullable = false, length = 50)
    private String presenciaCriaAbierta;

    @Column(name = "porcentaje_cuadro", precision = 5, scale = 2)
    private BigDecimal porcentajeCuadro;

    @Column(nullable = false, length = 50)
    private String reinas;

    @Column(nullable = false, length = 50)
    private String reservaAlimento;

    @Column(nullable = false, length = 50)
    private String alimentacionArtificial;

    @Column(nullable = false, length = 50)
    private String comportamientoHigienico;

    @Column(nullable = false, length = 50)
    private String estadoSanitario;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
}
