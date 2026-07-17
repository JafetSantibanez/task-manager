# 📋 Task Manager - Mini CRUD de Tareas

## 📖 Descripción

**Task Manager** es una aplicación web desarrollada como parte de una prueba técnica para demostrar el desarrollo de un CRUD (Create, Read, Update y Delete) utilizando **Laravel** como backend y **JavaScript Vanilla** con **Fetch API** para el consumo de una API REST.

La aplicación permite administrar tareas de forma sencilla, ofreciendo una interfaz intuitiva y una arquitectura limpia basada en buenas prácticas de desarrollo.

---

## ✨ Funcionalidades

* ✅ Crear nuevas tareas.
* 📋 Consultar todas las tareas registradas.
* ✏️ Editar tareas existentes.
* 🗑️ Eliminar tareas.
* ✔️ Gestión de estados:

  * Pendiente
  * En progreso
  * Completada
* ⚠️ Validación de datos desde Laravel.
* 🔄 Consumo de API REST mediante Fetch API.
* 🎨 Interfaz desarrollada con HTML, CSS y JavaScript.

---

## 🛠️ Tecnologías utilizadas

### Backend

* PHP 8.x
* Laravel 12
* Eloquent ORM
* API REST

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API
* Blade Templates

### Base de Datos

* MySQL

### Herramientas

* Composer
* Git
* GitHub

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/JafetSantibanez/task-manager.git
```

Entrar al proyecto:

```bash
cd task-manager
```

---

### 2. Instalar dependencias

```bash
composer install
```

---

### 3. Configurar el archivo de entorno

Crear el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

---

### 4. Generar la clave de la aplicación

```bash
php artisan key:generate
```

---

### 5. Crear y Configurar la base de datos

Crear una base de datos en MySQL con el nombre que desees. Por ejemplo:

```sql
CREATE DATABASE task_manager;
```

Editar el archivo `.env` con las credenciales correspondientes:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

---

### 6. Ejecutar las migraciones

```bash
php artisan migrate
```

---

### 7. Iniciar el servidor

```bash
php artisan serve
```

La aplicación estará disponible en:

```
http://127.0.0.1:8000
```

---

## 📡 API REST

| Método | Endpoint          | Descripción              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/tasks`      | Obtener todas las tareas |
| POST   | `/api/tasks`      | Crear una tarea          |
| PATCH  | `/api/tasks/{id}` | Actualizar una tarea     |
| DELETE | `/api/tasks/{id}` | Eliminar una tarea       |

---

## 📸 Características implementadas

* Arquitectura MVC con Laravel.
* API REST para la gestión de tareas.
* Comunicación asíncrona mediante Fetch API.
* Renderizado dinámico de tareas.
* Validaciones del lado del servidor.
* Manejo de errores HTTP.
* Estados de carga y notificaciones para mejorar la experiencia del usuario.

---

## 👨‍💻 Autor

**Jafet Santibañez**

GitHub: https://github.com/JafetSantibanez

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte de una prueba técnica.

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
