# Muebleria los muebles hermanos S.A - Backend - Marcelo Cid Cisternas

## Descripción
Sistema backend para la gestión de catálogo, cotizaciones y ventas de "Mueblería los muebles hermanos S.A"

## Tecnologías Utilizadas
- Java 17
- Spring Boot 3.x
- MySQL 8.0
- JUnit 5
- Maven

## Patrones de Diseño Implementados

### 1. Strategy (Estrategia)
**Propósito**: Definir una familia de algoritmos de cálculo de precios.

**Ubicación**: `servicios.strategy`

**Implementación**:
- `PrecioStrategy`: Interfaz que define el contrato
- `PrecioNormalStrategy`: Calcula precio sin variantes
- `PrecioConVarianteStrategy`: Calcula precio con variantes premium

**Uso**: Se utiliza en `PrecioService` para calcular dinámicamente el precio final según si el mueble tiene variantes o no.

### 2. Singleton
**Propósito**: Garantizar una única instancia de configuración de precios.

**Ubicación**: `config.ConfiguracionPreciosManager`

**Implementación**: Constructor privado y método estático `getInstance()`

**Uso**: Gestiona configuraciones globales como IVA y descuentos de forma centralizada.

## Instalación y Configuración

### Prerrequisitos
- JDK 17 o superior
- Maven 3.6+
- MySQL 8.0 (XAMPP recomendado)
- IDE (IntelliJ IDEA o VSC)

### Pasos

1. **Clonar el repositorio**
```bash
git clone [URL_DE_TU_REPO]
cd muebles-hermanos
```

2. **Configurar MySQL**
- Inicia XAMPP y arranca MySQL
- Crea la base de datos:
- Importar archivo db.sql con la base de datos requerida

3. **Configurar application.properties**
Edita `src/main/resources/application.properties`:
```properties
spring.application.name=muebles-hermanos

# Configuración de MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/muebleria_db
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración de JPA/Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Puerto del servidor
server.port=8080
```

4. **Compilar y ejecutar**
```bash
mvn clean install
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

## Endpoints Disponibles

### Muebles
- `POST /api/muebles` - Crear mueble
- `GET /api/muebles` - Listar todos
- `GET /api/muebles/activos` - Listar activos
- `GET /api/muebles/{id}` - Buscar por ID
- `PUT /api/muebles/{id}` - Actualizar
- `DELETE /api/muebles/{id}` - Desactivar

### Cotizaciones
- `POST /api/cotizaciones` - Crear cotización
- `GET /api/cotizaciones` - Listar todas
- `GET /api/cotizaciones/{id}` - Buscar por ID
- `POST /api/cotizaciones/{id}/confirmar` - Confirmar venta

## Testing
Ejecutar todos los tests:
```bash
mvn test
```

Los tests cubren:
- Cálculo de precios con variantes
- Gestión de stock
- Confirmación de ventas
- CRUD de muebles
