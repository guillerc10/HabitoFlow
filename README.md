# HabitFlow 🔥

Aplicación full-stack de seguimiento de hábitos diarios, construida como proyecto de portafolio en 17 días. Backend con Django + Django REST Framework, frontend con React, base de datos PostgreSQL, y todo containerizado con Docker.

## Capturas

![Lista de hábitos](docs/screenshots/lista-habitos.png)
![Progreso y heatmap](docs/screenshots/heatmap.png)
![Login](docs/screenshots/login.png)

## Funcionalidades

- Registro e inicio de sesión de usuarios
- CRUD completo de hábitos (crear, editar, eliminar, listar)
- Check-in diario con toggle (marcar/desmarcar) sin recargar la página
- Cálculo automático de racha actual
- Visualización de progreso con heatmap de los últimos 30 días
- Cada usuario ve y gestiona únicamente sus propios hábitos (permisos y filtrado por usuario en cada endpoint)
- Diseño responsive (adaptado a celular, tablet y escritorio)
- Tests automatizados en el backend

## Stack tecnológico

**Backend**
- Django 6.1
- Django REST Framework
- PostgreSQL (producción/Docker) / SQLite (desarrollo local)
- Autenticación por sesión con protección CSRF

**Frontend**
- React 19 + Vite
- Axios
- Bootstrap 5
- date-fns

**Infraestructura**
- Docker + Docker Compose (backend, frontend y base de datos en contenedores separados)

## Arquitectura

\`\`\`
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   React     │ ──API──▶│    Django    │ ──ORM──▶│  PostgreSQL │
│ (puerto 5173)│ ◀──JSON──│ (puerto 8000)│         │ (puerto 5432)│
└─────────────┘         └──────────────┘         └─────────────┘
\`\`\`

Cada componente corre en su propio contenedor Docker, orquestados con `docker-compose`.

## Cómo correrlo localmente

### Con Docker (recomendado)

\`\`\`bash
git clone https://github.com/guillerc10/<nombre-del-repo>.git
cd <nombre-del-repo>
cp .env.example .env
docker-compose up --build
\`\`\`

Luego, en otra terminal:
\`\`\`bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
\`\`\`

- Backend: http://localhost:8000
- Frontend: http://localhost:5173

### Sin Docker (entorno local)

**Backend:**
\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
\`\`\`

**Frontend** (en otra terminal):
\`\`\`bash
cd habitflow-frontend
npm install
npm run dev
\`\`\`

## Tests

\`\`\`bash
python3 manage.py test habits
\`\`\`

## Decisiones técnicas destacadas

- **Separación API/Frontend**: el backend expone únicamente una API REST (sin templates para el flujo principal), permitiendo que cualquier cliente (web, móvil) la consuma.
- **Seguridad por usuario**: cada endpoint filtra explícitamente por el usuario autenticado, con validación adicional para evitar que un usuario cree o modifique datos de otro (probado con tests automatizados y manualmente con dos cuentas distintas).
- **Configuración dual de base de datos**: el proyecto detecta automáticamente si corre dentro de Docker (PostgreSQL) o en desarrollo local (SQLite), sin necesitar cambios manuales de código.
- **Manejo de CSRF entre orígenes distintos**: al separar frontend y backend en puertos diferentes, se implementó manejo explícito de cookies CSRF entre React y Django.

## Autor

Guillermo Cáceres — [GitHub](https://github.com/guillerc10)