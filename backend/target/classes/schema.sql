-- =====================================================
-- Base de datos: gestion_colmenas
-- Descripción: Tablas para gestión de colmenas apícolas
-- Nota: Este script se ejecuta automáticamente al iniciar
--       la aplicación (spring.sql.init.mode=always)
-- =====================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chequeos_generales (
    id SERIAL PRIMARY KEY,
    colmena_id INTEGER NOT NULL CHECK (colmena_id BETWEEN 1 AND 15),
    fecha DATE NOT NULL,
    alza VARCHAR(50) NOT NULL,
    cuadro INTEGER NOT NULL CHECK (cuadro BETWEEN 1 AND 10),
    temperamento VARCHAR(50) NOT NULL,
    poblacion VARCHAR(50) NOT NULL,
    presencia_miel VARCHAR(50) NOT NULL DEFAULT 'Sin presencia',
    presencia_pan_abeja VARCHAR(50) NOT NULL DEFAULT 'Sin presencia',
    presencia_cria_operculada VARCHAR(50) NOT NULL DEFAULT 'Sin presencia',
    presencia_cria_abierta VARCHAR(50) NOT NULL DEFAULT 'Sin presencia',
    porcentaje_cuadro DECIMAL(5,2),
    reinas VARCHAR(50) NOT NULL DEFAULT 'Sin reina',
    reserva_alimento VARCHAR(50) NOT NULL DEFAULT 'Sin reserva',
    alimentacion_artificial VARCHAR(50) NOT NULL DEFAULT 'Sin alimentación',
    comportamiento_higienico VARCHAR(50) NOT NULL DEFAULT 'Regular',
    estado_sanitario VARCHAR(50) NOT NULL DEFAULT 'Sano',
    observaciones TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_colmena_fecha_cuadro UNIQUE(colmena_id, fecha, cuadro)
);

CREATE TABLE IF NOT EXISTS registros_cosecha (
    id SERIAL PRIMARY KEY,
    colmena_id INTEGER NOT NULL CHECK (colmena_id BETWEEN 1 AND 15),
    fecha DATE NOT NULL,
    alza VARCHAR(50) NOT NULL,
    cuadro INTEGER NOT NULL CHECK (cuadro BETWEEN 1 AND 10),
    metodo_extraccion VARCHAR(50) NOT NULL CHECK (metodo_extraccion IN ('Presión', 'Centrífuga')),
    cuadro_reemplazo VARCHAR(50) NOT NULL CHECK (cuadro_reemplazo IN ('Con cera', 'Sin cera')),
    cuadros_faltantes_con_cera INTEGER DEFAULT 0,
    cuadros_faltantes_sin_cera INTEGER DEFAULT 0,
    usuario_id INTEGER REFERENCES usuarios(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_cosecha_colmena_fecha UNIQUE(colmena_id, fecha)
);

CREATE INDEX IF NOT EXISTS idx_chequeos_colmena ON chequeos_generales(colmena_id);
CREATE INDEX IF NOT EXISTS idx_chequeos_fecha ON chequeos_generales(fecha);
CREATE INDEX IF NOT EXISTS idx_cosecha_colmena ON registros_cosecha(colmena_id);
CREATE INDEX IF NOT EXISTS idx_cosecha_fecha ON registros_cosecha(fecha);
