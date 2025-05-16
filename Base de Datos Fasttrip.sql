-- Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT NOT NULL,
    telefono VARCHAR(20),
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('admin', 'conductor', 'cliente', 'comercio')),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Conductores
CREATE TABLE conductores (
    id_usuario INT REFERENCES usuarios(id),
    placa VARCHAR(20),
    tipo_vehiculo VARCHAR(50),
    marca VARCHAR(50),
    modelo VARCHAR(50),
    disponible BOOLEAN DEFAULT TRUE,
    latitud DECIMAL(9,6),
    longitud DECIMAL(9,6),
    PRIMARY KEY (id_usuario)
);

-- Tabla de Clientes
CREATE TABLE clientes (
    id_usuario INT REFERENCES usuarios(id),
    direccion TEXT,
    PRIMARY KEY (id_usuario)
);

-- Tabla de Comercios
CREATE TABLE comercios (
    id_usuario INT REFERENCES usuarios(id),
    nombre_empresa VARCHAR(100),
    direccion TEXT,
    PRIMARY KEY (id_usuario)
);

-- Tabla de Servicios
CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES usuarios(id),
    id_conductor INT REFERENCES usuarios(id),
    origen_lat DECIMAL(9,6),
    origen_lng DECIMAL(9,6),
    destino_lat DECIMAL(9,6),
    destino_lng DECIMAL(9,6),
    tipo_carga VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aceptado', 'en proceso', 'completado')),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Facturas
CREATE TABLE facturas (
    id SERIAL PRIMARY KEY,
    id_servicio INT REFERENCES servicios(id),
    monto NUMERIC(10,2),
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Calificaciones
CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES usuarios(id),
    id_conductor INT REFERENCES usuarios(id),
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de solicitudes de registro pendientes
CREATE TABLE newregistro (
    id_registro SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('admin', 'cliente', 'comercio', 'conductor')),
    red_social VARCHAR(100), -- opcional
    mensaje TEXT,           -- opcional
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_registro VARCHAR(20) DEFAULT 'pendiente' CHECK (estado_registro IN ('pendiente', 'aprobado', 'rechazado'))
);