
# Mueblería Los Muebles Hermanos S.A. - Frontend

Interfaz gráfica moderna para el sistema de gestión de mueblería, desarrollada con React y TypeScript. Se integra con un backend Spring Boot para gestionar inventario, cotizaciones y ventas.

## Características

- **Vista Dual**: Panel de cliente (catálogo) y panel de administrador.
- **Gestión de Inventario**: CRUD completo de muebles con control de stock y precios base.
- **Sistema de Variantes**: Soporte para variantes de productos (ej. acabados premium) que modifican el precio.
- **Cotizaciones**: Carrito de cotización para clientes y gestión de confirmación de ventas para administradores.
- **Control de Stock**: Visualización de disponibilidad y validación en tiempo real.

## Requisitos Previos

- Node.js 16+
- Backend Spring Boot corriendo en `http://localhost:8080`

## Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar Backend**:
   Asegúrate que el backend Java/Spring Boot esté ejecutándose. La aplicación espera la API en `http://localhost:8080`.
   Si tu backend está en otro puerto, edita `src/config.ts`.

3. **Iniciar Frontend**:
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

```
src/
├── components/         # Componentes UI
│   ├── ui/            # Componentes base (Button, Input, etc.)
│   ├── QuoteCart.tsx  # Carrito de cotización flotante
│   ├── QuoteList.tsx  # Lista de cotizaciones (Admin)
│   └── ...
├── pages/
│   ├── UserView.tsx   # Catálogo y creación de cotizaciones
│   └── AdminView.tsx  # Gestión de inventario y ventas
├── services/
│   └── api.ts         # Capa de comunicación con Backend
├── types/
│   ├── furniture.ts   # Interfaces de Mueble y Variante
│   └── quote.ts       # Interfaces de Cotización
└── config.ts          # Configuración de API
```

## Integración con Backend

El frontend consume los siguientes endpoints:

- `GET /api/muebles`: Listar todo el inventario
- `GET /api/muebles/activos`: Listar solo muebles disponibles para clientes
- `POST /api/muebles`: Crear nuevo mueble
- `POST /api/cotizaciones`: Crear nueva cotización
- `POST /api/cotizaciones/{id}/confirmar`: Convertir cotización en venta (descuenta stock)

## Tecnologías

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (Iconos)
