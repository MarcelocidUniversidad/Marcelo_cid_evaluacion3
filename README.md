# Mueblería "Los Muebles Hermanos S.A"

Muebleria los muebles hermanos S.A es un negocio que comercializa distintos tipos de muebles (sillas, sillones, mesas, estantes y cajones), con diferentes variaciones (material, tamaños y estilos).

## Descripción del Proyecto

Este sistema proporciona una solución digital para:
- **Gestión de Catálogo (CRUD)**: Administrar muebles con sus detalles (nombre, tipo, precio base, stock, tamaño, material, estado).
- **Variantes de Producto**: Soporte para personalizaciones (ej. Barniz Premium, Ruedas) que ajustan el precio final.
- **Cotizaciones y Ventas**: Creación de cotizaciones para clientes y confirmación de ventas con descuento automático de stock.

## Tecnologías Utilizadas

### Backend
- **Java 17** & **Spring Boot 3.1**
- **Spring Data JPA** (Hibernate) para persistencia.
- **MySQL 8.0** como base de datos relacional.
- **Docker** para contenerización.

### Frontend
- **React 18** con **TypeScript**.
- **Vite** para un entorno de desarrollo rápido.
- **Tailwind CSS** para un diseño moderno y responsivo.
- **Nginx** para servir la aplicación en producción.


## 🚀 Instalación y Ejecución

El proyecto está completamente dockerizado para una fácil puesta en marcha.

1.  Clonar el repositorio o descargar el código.
2.  Configurar variables de entorno (Opcional):
    El archivo `.env` en la raíz ya contiene configuraciones por defecto para el entorno local.
3.  Ejecutar con Docker Compose:
    Abre una terminal en la carpeta raíz del proyecto y ejecuta:

    ```bash
    docker-compose up --build
    ```

    Esto construirá las imágenes del backend y frontend, y levantará la base de datos MySQL.

4.  **Acceder a la Aplicación**:
    - **Frontend (Web)**: [http://localhost:3000](http://localhost:3000)
    - **Backend (API)**: [http://localhost:8080/api/muebles](http://localhost:8080/api/muebles)

> **Nota**: La base de datos se inicializa automáticamente con datos de prueba la primera vez que se ejecuta el contenedor.

## Estructura de la API (Endpoints Principales)

- `GET /api/muebles`: Listar todos los muebles.
- `GET /api/muebles/activos`: Listar solo muebles activos para venta.
- `POST /api/muebles`: Crear un nuevo mueble.
- `PUT /api/muebles/{id}`: Actualizar un mueble existente.
- `POST /api/cotizaciones`: Crear una nueva cotización.
- `POST /api/cotizaciones/{id}/confirmar`: Confirmar una venta (reduce stock).
