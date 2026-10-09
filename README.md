# Gestión de Colmenas Apícolas

Aplicación web para la gestión de 15 colmenas apícolas - Universidad de Cundinamarca, Unidad Agroambiental La Esperanza.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Angular 18, Tailwind CSS, @angular/animations |
| Backend | Spring Boot 3.3, Java 17, Clean Architecture |
| Base de Datos | PostgreSQL |
| Reportes | Apache POI (Excel) |
| Seguridad | Spring Security + JWT |

## Estructura del Proyecto

```
colmenasAbejas/
├── backend/                    # Spring Boot (Clean Architecture)
│   ├── src/main/java/com/apicolagestion/
│   │   ├── domain/entities/     # Entidades JPA
│   │   ├── application/
│   │   │   ├── controller/     # Controladores REST
│   │   │   ├── service/        # Servicios de aplicación
│   │   │   └── dto/            # Objetos de transferencia
│   │   └── infrastructure/
│   │       ├── config/         # Configuración Spring
│   │       ├── repositories/   # Repositorios JPA
│   │       └── security/       # JWT y filtros
│   └── src/main/resources/
│       ├── application.yml
│       └── schema.sql
├── frontend/                   # Angular 18
│   └── src/app/
│       ├── animations/         # Animaciones de ruta
│       ├── components/         # Componentes
│       ├── guards/             # Guards de autenticación
│       ├── interceptors/       # Interceptor JWT
│       └── services/           # Servicios HTTP
└── README.md
```

## Configuración Backend

### 1. Base de Datos PostgreSQL

```bash
# Crear base de datos
psql -U postgres -f backend/src/main/resources/schema.sql
```

### 2. Configurar application.yml

Edita `backend/src/main/resources/application.yml`:
- `spring.datasource.url`: URL de PostgreSQL
- `spring.datasource.username`: Usuario
- `spring.datasource.password`: Contraseña
- `app.jwt.secreto`: Clave secreta JWT (cambiar en producción)

### 3. Ejecutar Backend

```bash
cd backend
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

## Configuración Frontend

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Configurar URL del API

Edita `src/environments/environment.ts` para desarrollo:
```typescript
apiUrl: 'http://localhost:8080/api'
```

Edita `src/environments/environment.prod.ts` para producción:
```typescript
apiUrl: 'https://tu-backend.com/api'
```

### 3. Ejecutar Frontend

```bash
cd frontend
ng serve
```

Disponible en `http://localhost:4200`

## Despliegue en Vercel

### Frontend

1. Conectar el repositorio a Vercel
2. Configurar:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/colmenas-frontend`
   - **Install Command**: `npm install`
3. Configurar variable de entorno:
   - `NG_ENV=production` (usa environment.prod.ts)

### Backend (Alternativas)

El backend Spring Boot puede desplegarse en:
- **Render** (recomendado para Java)
- **Railway**
- **Heroku**
- **AWS EC2**

### Base de Datos

- **Neon** (PostgreSQL serverless)
- **Supabase**
- **ElephantSQL**

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/registro` | Registrar usuario |
| GET | `/api/colmenas/{id}/chequeos` | Listar chequeos |
| POST | `/api/colmenas/{id}/chequeos` | Crear chequeo |
| GET | `/api/colmenas/{id}/cosechas` | Listar cosechas |
| POST | `/api/colmenas/{id}/cosechas` | Crear cosecha |
| GET | `/api/excel/exportar` | Descargar Excel |

## Características

- Autenticación JWT con Spring Security
- Animaciones de ruta con @angular/animations
- Diseño responsive con Tailwind CSS
- Exportación a Excel con Apache POI
- Clean Architecture en el backend
- Colores apícolas (amarillo, ámbar, oscuro)
