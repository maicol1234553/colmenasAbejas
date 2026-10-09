package com.apicolagestion.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "registros_cosecha")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistroCosecha {

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

    @Column(name = "metodo_extraccion", nullable = false, length = 50)
    private String metodoExtraccion;

    @Column(name = "cuadro_reemplazo", nullable = false, length = 50)
    private String cuadroReemplazo;

    @Column(name = "cuadros_faltantes_con_cera")
    private Integer cuadrosFaltantesConCera;

    @Column(name = "cuadros_faltantes_sin_cera")
    private Integer cuadrosFaltantesSinCera;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
}
