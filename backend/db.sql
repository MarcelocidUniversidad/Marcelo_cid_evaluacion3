-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS muebleria_db;
USE muebleria_db;

-- Eliminar tablas si existen (para pruebas limpias)
DROP TABLE IF EXISTS detalle_cotizaciones;
DROP TABLE IF EXISTS cotizaciones;
DROP TABLE IF EXISTS variantes;
DROP TABLE IF EXISTS muebles;

-- Tabla de Muebles
CREATE TABLE muebles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    precio_base DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    tamanio VARCHAR(20) NOT NULL,
    material VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Variantes
CREATE TABLE variantes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    precio_adicional DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Cotizaciones
CREATE TABLE cotizaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    estado VARCHAR(20) NOT NULL,
    total DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Detalle de Cotizaciones
CREATE TABLE detalle_cotizaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cotizacion_id BIGINT NOT NULL,
    mueble_id BIGINT NOT NULL,
    variante_id BIGINT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cotizacion_id) REFERENCES cotizaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (mueble_id) REFERENCES muebles(id) ON DELETE RESTRICT,
    FOREIGN KEY (variante_id) REFERENCES variantes(id) ON DELETE SET NULL
);

-- Insertar datos de prueba para Muebles
INSERT INTO muebles (nombre, tipo, precio_base, stock, estado, tamanio, material) VALUES
('Silla Ejecutiva Premium', 'Silla', 150000.00, 25, 'ACTIVO', 'GRANDE', 'Cuero'),
('Mesa de Comedor Roble', 'Mesa', 350000.00, 10, 'ACTIVO', 'GRANDE', 'Roble'),
('Estante Modular', 'Estante', 120000.00, 15, 'ACTIVO', 'MEDIANO', 'Melamina'),
('Sillon Reclinable', 'Sillon', 280000.00, 8, 'ACTIVO', 'GRANDE', 'Tela'),
('Cajonera 4 Cajones', 'Cajon', 95000.00, 20, 'ACTIVO', 'MEDIANO', 'MDF'),
('Silla de Oficina Basica', 'Silla', 65000.00, 30, 'ACTIVO', 'MEDIANO', 'Plastico'),
('Mesa de Centro Vidrio', 'Mesa', 180000.00, 12, 'ACTIVO', 'PEQUENO', 'Vidrio'),
('Estante Biblioteca', 'Estante', 220000.00, 5, 'ACTIVO', 'GRANDE', 'Pino'),
('Sillon Esquinero', 'Sillon', 450000.00, 3, 'ACTIVO', 'GRANDE', 'Cuero'),
('Cajonera con Ruedas', 'Cajon', 75000.00, 18, 'ACTIVO', 'PEQUENO', 'Melamina');

-- Insertar datos de prueba para Variantes
INSERT INTO variantes (nombre, descripcion, precio_adicional) VALUES
('Barniz Premium', 'Acabado con barniz de alta calidad', 15000.00),
('Cojines de Seda', 'Cojines adicionales de seda importada', 25000.00),
('Ruedas Premium', 'Ruedas con rodamiento industrial', 12000.00),
('Acabado Mate', 'Acabado mate anti-reflejos', 8000.00),
('Tapizado Extra', 'Tapizado reforzado de alta durabilidad', 20000.00),
('Vidrio Templado', 'Vidrio templado de seguridad', 30000.00),
('Sistema Anti-Volcado', 'Sistema de seguridad anti-volcado', 10000.00),
('Cajones con Cierre Suave', 'Mecanismo de cierre suave', 18000.00);

-- Insertar una cotización de ejemplo (PENDIENTE)
INSERT INTO cotizaciones (fecha, estado, total) VALUES
(NOW(), 'PENDIENTE', 0.00);

-- Obtener el ID de la cotización recién creada (será 1 si es la primera)
SET @cotizacion_id = LAST_INSERT_ID();

-- Insertar detalles de la cotización de ejemplo
INSERT INTO detalle_cotizaciones (cotizacion_id, mueble_id, variante_id, cantidad, precio_unitario, subtotal) VALUES
(@cotizacion_id, 1, 2, 2, 175000.00, 350000.00),  -- 2 Sillas Ejecutivas con Cojines de Seda
(@cotizacion_id, 3, 1, 1, 135000.00, 135000.00);  -- 1 Estante Modular con Barniz Premium

-- Actualizar el total de la cotización
UPDATE cotizaciones SET total = 485000.00 WHERE id = @cotizacion_id;
