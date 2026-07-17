<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >
    <title>Administrador de tareas</title>
    <link
        rel="stylesheet"
        href="{{ asset('css/tasks.css') }}"
    >
</head>

<body>
    <header class="app-header">
        <div class="container">
            <p class="app-eyebrow">
                Task Manager
            </p>

            <h1>
                Administrador de tareas
            </h1>

            <p class="app-description">
                Crea, consulta, actualiza y elimina tus tareas.
            </p>
        </div>
    </header>

    <main class="container">
        <section
            class="task-form-section"
            aria-labelledby="task-form-title"
        >
            <h2 id="task-form-title">
                Crear nueva tarea
            </h2>

            <form
                id="task-form"
                novalidate
            >
                <input
                    type="hidden"
                    id="task-id"
                    name="task_id"
                >

                <div class="form-group">
                    <label for="title">
                        Título
                    </label>

                    <input
                        type="text"
                        id="title"
                        name="title"
                        maxlength="255"
                        placeholder="Ejemplo: Terminar prueba técnica"
                        autocomplete="off"
                        required
                        aria-describedby="title-error"
                    >

                    <p
                        id="title-error"
                        class="field-error"
                        aria-live="polite"
                    ></p>
                </div>

                <div class="form-group">
                    <label for="description">
                        Descripción
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Describe los detalles de la tarea"
                        aria-describedby="description-error"
                    ></textarea>

                    <p
                        id="description-error"
                        class="field-error"
                        aria-live="polite"
                    ></p>
                </div>

                <div class="form-group">
                    <label for="status">
                        Estado
                    </label>

                    <select
                        id="status"
                        name="status"
                        required
                        aria-describedby="status-error"
                    >
                        <option value="pending">
                            Pendiente
                        </option>

                        <option value="in_progress">
                            En progreso
                        </option>

                        <option value="done">
                            Completada
                        </option>
                    </select>

                    <p
                        id="status-error"
                        class="field-error"
                        aria-live="polite"
                    ></p>
                </div>

                <div class="form-actions">
                    <button
                        type="submit"
                        id="submit-button"
                    >
                        Crear tarea
                    </button>

                    <button
                        type="button"
                        id="cancel-edit-button"
                        hidden
                    >
                        Cancelar edición
                    </button>
                </div>
            </form>
        </section>

        <section
            id="notification"
            class="notification"
            role="status"
            aria-live="polite"
            hidden
        ></section>

        <section
            class="task-list-section"
            aria-labelledby="task-list-title"
        >
            <div class="section-heading">
                <div>
                    <p class="section-eyebrow">
                        Mis tareas
                    </p>

                    <h2 id="task-list-title">
                        Lista de tareas
                    </h2>
                </div>

                <span id="task-count">
                    0 tareas
                </span>
            </div>

            <div
                id="loading-message"
                class="state-message"
                aria-live="polite"
                hidden
            >
                Cargando tareas...
            </div>

            <div
                id="empty-message"
                class="state-message"
                hidden
            >
                No hay tareas registradas.
            </div>

            <div
                id="task-list"
                class="task-list"
            ></div>
        </section>
    </main>

    <script src="{{ asset('js/tasks.js') }}"></script>
</body>
</html>