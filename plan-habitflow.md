# HabitFlow — Plan de 17 días (15 al 31 de agosto)

Gestor de hábitos diarios: crear hábitos, marcarlos como cumplidos día a día, calcular rachas (streaks) y ver progreso. Objetivo: portafolio técnico, con historial de commits diario y evolución clara (Django+templates → API+React → Docker).

Stack: HTML, CSS, Bootstrap 5, jQuery, Git, Python, SQLite, Django, Django REST Framework, React, Docker.

---

## Fase 1 — Django + Bootstrap + jQuery (server-side) — Días 1 a 6

**Día 1 (15 ago) — Setup del proyecto**
- Crear repo en GitHub, `.gitignore`, entorno virtual, instalar Django.
- `django-admin startproject habitflow`, crear app `habits`.
- Commit: "Initial Django project setup".

**Día 2 (16 ago) — Modelos y base de datos**
- Modelo `Habit` (nombre, descripción, frecuencia, fecha de creación) y `HabitLog` (hábito, fecha, cumplido/no).
- Migraciones con SQLite. Registrar en Django Admin.
- Commit: "Add Habit and HabitLog models + admin".

**Día 3 (17 ago) — Vistas y templates base**
- Listado de hábitos con Bootstrap (navbar, layout).
- Vista de detalle de un hábito con su historial.
- Commit: "List/detail views + Bootstrap base template".

**Día 4 (18 ago) — CRUD de hábitos**
- Crear, editar, eliminar hábitos.
- Marcar/desmarcar cumplimiento del día actual (toggle).
- Commit: "Full CRUD for habits + daily check-in".

**Día 5 (19 ago) — Autenticación**
- Login/logout/registro con el sistema de auth de Django.
- Cada usuario ve solo sus hábitos.
- Commit: "User authentication + per-user data".

**Día 6 (20 ago) — Lógica de rachas + jQuery**
- Calcular racha actual y racha máxima por hábito (lógica en el modelo o en una vista).
- Toggle de check-in diario con jQuery (sin recargar página), feedback visual (ej. contador de racha animado).
- Commit: "Streak calculation + jQuery check-in".

---

## Fase 2 — API + React — Días 7 a 13

**Día 7 (21 ago) — Django REST Framework: setup**
- Instalar DRF, serializers para `Habit` y `HabitLog`.
- Endpoints: list/create de hábitos.
- Commit: "DRF setup + basic serializers".

**Día 8 (22 ago) — API completa + permisos**
- Endpoints para check-in diario, historial y cálculo de racha vía API.
- Autenticación por token, permisos por usuario.
- Commit: "Full REST API with auth permissions".

**Día 9 (23 ago) — Setup de React**
- Crear proyecto React (Vite), estructura de carpetas, conexión con la API.
- Listar hábitos desde React.
- Commit: "React app scaffold + fetch habits".

**Día 10 (24 ago) — CRUD y check-in en React**
- Crear/editar hábitos y marcar check-in diario desde React, conectado a la API.
- Componentización (HabitList, HabitCard, HabitForm).
- Commit: "CRUD + check-in from React".

**Día 11 (25 ago) — Visualización de progreso**
- Mostrar racha actual/máxima y un mini-calendario o gráfico de cumplimiento (ej. con una librería simple o CSS grid tipo "heatmap" estilo GitHub).
- Commit: "Progress visualization (streaks + heatmap)".

**Día 12 (26 ago) — Login desde React**
- Formulario de login/registro en React consumiendo la API de auth.
- Manejo de token/sesión en el frontend.
- Commit: "Auth flow from React frontend".

**Día 13 (27 ago) — Pulido de React + estilos**
- Mejorar UI, estados de carga/error, responsive.
- Commit: "UI polish + responsive design".

---

## Fase 3 — Docker + cierre — Días 14 a 17

**Día 14 (28 ago) — Dockerizar backend**
- Dockerfile para Django, requirements.txt limpio.
- Probar contenedor backend solo.
- Commit: "Dockerize Django backend".

**Día 15 (29 ago) — Dockerizar frontend + docker-compose**
- Dockerfile para React (build + nginx o dev server).
- `docker-compose.yml` levantando backend + frontend juntos.
- Commit: "Dockerize React frontend + docker-compose".

**Día 16 (30 ago) — Testing y detalles finales**
- Revisar bugs, agregar algún test básico (Django TestCase para el cálculo de racha), variables de entorno.
- Commit: "Bug fixes + basic tests".

**Día 17 (31 ago) — README y presentación**
- README completo: descripción, capturas, cómo correrlo (`docker-compose up`), stack usado, decisiones de arquitectura (por qué la lógica de rachas se calculó así, etc).
- Deploy opcional (Render/Railway) si da el tiempo.
- Commit final: "Final polish + README".

---

## Reglas del reto
- Un commit real por día como mínimo (aunque sea chico).
- Si un día se complica, priorizamos avanzar algo antes que dejarlo en cero.
- Cada día te explico el "por qué" de lo que hacemos, no solo el "cómo" — para que lo puedas defender en la entrevista.
