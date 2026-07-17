'use strict';

// =====================================================
// Configuración
// =====================================================

const API_URL = '/api/tasks';

const STATUS_LABELS = {
    pending: 'Pendiente',
    in_progress: 'En progreso',
    done: 'Completada',
};

// =====================================================
// Elementos del DOM
// =====================================================

const elements = {
    form: document.getElementById('task-form'), 
    formTitle: document.getElementById('task-form-title'), 

    taskId: document.getElementById('task-id'),
    title: document.getElementById('title'),
    description: document.getElementById('description'),
    status: document.getElementById('status'),

    titleError: document.getElementById('title-error'),
    descriptionError: document.getElementById('description-error'),
    statusError: document.getElementById('status-error'),

    submitButton: document.getElementById('submit-button'),
    cancelEditButton: document.getElementById(
        'cancel-edit-button'
    ),

    notification: document.getElementById('notification'),

    taskCount: document.getElementById('task-count'),
    loadingMessage: document.getElementById(
        'loading-message'
    ),
    emptyMessage: document.getElementById(
        'empty-message'
    ),
    taskList: document.getElementById('task-list'),
};

// =====================================================
// Estado de la aplicación
// =====================================================

const state = {
    tasks: [],
    editingTaskId: null,
    isSubmitting: false,
    deletingTaskId: null,
};

// =====================================================
// Inicialización
// =====================================================

async function initializeApp() {
    registerEventListeners();
    resetForm();
    await loadTasks();
}

function registerEventListeners() {
    elements.form.addEventListener(
        'submit',
        handleFormSubmit
    );

    elements.cancelEditButton.addEventListener(
        'click',
        handleCancelEdit
    );

    elements.taskList.addEventListener(
        'click',
        handleTaskListClick
    );
}

// =====================================================
// Eventos
// =====================================================

async function handleFormSubmit(event) {
    event.preventDefault();

    if (state.isSubmitting) {
        return;
    }

    clearFieldErrors();
    hideNotification();

    const data = getFormData();

    try {
        setSubmitButtonLoading(true);

        if (state.editingTaskId === null) {
            await createTask(data);
        } else {
            await updateTask(
                state.editingTaskId,
                data
            );
        }
    } catch (error) {
        handleRequestError(error);
    } finally {
        setSubmitButtonLoading(false);
    }
}

function handleCancelEdit() {
    resetForm();
    hideNotification();
}

async function handleTaskListClick(event) {
    const actionButton = event.target.closest(
        'button[data-action]'
    );

    if (!actionButton) {
        return;
    }

    const taskId = Number(actionButton.dataset.id);
    const action = actionButton.dataset.action;

    if (!Number.isInteger(taskId)) {
        showNotification(
            'El identificador de la tarea no es válido.',
            'error'
        );

        return;
    }

    if (action === 'edit') {
        startEditingTask(taskId);
        return;
    }

    if (action === 'delete') {
        await confirmAndDeleteTask(taskId);
    }
}

// =====================================================
// Formulario
// =====================================================

function getFormData() {
    return {
        title: elements.title.value.trim(),
        description: elements.description.value.trim(),
        status: elements.status.value,
    };
}

function resetForm() {
    elements.form.reset();

    elements.taskId.value = '';
    elements.status.value = 'pending';

    state.editingTaskId = null;

    elements.formTitle.textContent =
        'Crear nueva tarea';

    elements.submitButton.textContent =
        'Crear tarea';

    elements.cancelEditButton.hidden = true;

    clearFieldErrors();
    setSubmitButtonLoading(false);
}

function startEditingTask(taskId) {
    const task = findTaskById(taskId);

    if (!task) {
        showNotification(
            'No se encontró la tarea seleccionada.',
            'error'
        );

        return;
    }

    state.editingTaskId = task.id;

    elements.taskId.value = task.id;
    elements.title.value = task.title;
    elements.description.value =
        task.description ?? '';
    elements.status.value = task.status;

    elements.formTitle.textContent =
        `Editar tarea #${task.id}`;

    elements.submitButton.textContent =
        'Actualizar tarea';

    elements.cancelEditButton.hidden = false;

    clearFieldErrors();
    hideNotification();

    elements.title.focus();

    elements.form.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

function setSubmitButtonLoading(isLoading) {
    state.isSubmitting = isLoading;

    elements.submitButton.disabled = isLoading;
    elements.cancelEditButton.disabled = isLoading;

    if (isLoading) {
        elements.submitButton.textContent =
            state.editingTaskId === null
                ? 'Creando...'
                : 'Actualizando...';

        return;
    }

    elements.submitButton.textContent =
        state.editingTaskId === null
            ? 'Crear tarea'
            : 'Actualizar tarea';
}

// =====================================================
// API
// =====================================================

async function loadTasks() {
    try {
        showLoadingState();
        hideNotification();

        const response = await fetch(API_URL, {
            headers: {
                Accept: 'application/json',
            },
        });

        const result = await parseResponse(response);

        if (!response.ok) {
            throw createHttpError(
                result,
                'No fue posible obtener las tareas.'
            );
        }

        state.tasks = Array.isArray(result)
            ? result
            : [];

        renderTasks();
    } catch (error) {
        console.error(error);

        state.tasks = [];
        renderTasks();

        showNotification(
            error.message,
            'error'
        );
    } finally {
        hideLoadingState();
    }
}

async function createTask(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify(data),
    });

    const result = await parseResponse(response);

    if (!response.ok) {
        throw createHttpError(
            result,
            'No fue posible crear la tarea.'
        );
    }

    resetForm();

    showNotification(
        'Tarea creada correctamente.',
        'success'
    );

    await loadTasks();
}

async function updateTask(taskId, data) {
    const response = await fetch(
        `${API_URL}/${taskId}`,
        {
            method: 'PATCH',
            headers: getJsonHeaders(),
            body: JSON.stringify(data),
        }
    );

    const result = await parseResponse(response);

    if (!response.ok) {
        throw createHttpError(
            result,
            'No fue posible actualizar la tarea.'
        );
    }

    resetForm();

    showNotification(
        'Tarea actualizada correctamente.',
        'success'
    );

    await loadTasks();
}

async function confirmAndDeleteTask(taskId) {
    if (state.deletingTaskId !== null) {
        return;
    }

    const task = findTaskById(taskId);

    if (!task) {
        showNotification(
            'No se encontró la tarea seleccionada.',
            'error'
        );

        return;
    }

    const confirmed = window.confirm(
        `¿Seguro que deseas eliminar la tarea "${task.title}"?`
    );

    if (!confirmed) {
        return;
    }

    try {
        state.deletingTaskId = taskId;
        setTaskDeleteButtonLoading(taskId, true);
        hideNotification();

        await deleteTask(taskId);

        if (state.editingTaskId === taskId) {
            resetForm();
        }

        showNotification(
            'Tarea eliminada correctamente.',
            'success'
        );

        await loadTasks();
    } catch (error) {
        handleRequestError(error);
    } finally {
        setTaskDeleteButtonLoading(taskId, false);
        state.deletingTaskId = null;
    }
}

async function deleteTask(taskId) {
    const response = await fetch(
        `${API_URL}/${taskId}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        }
    );

    const result = await parseResponse(response);

    if (!response.ok) {
        throw createHttpError(
            result,
            'No fue posible eliminar la tarea.'
        );
    }
}

// =====================================================
// Respuestas y errores HTTP
// =====================================================

function getJsonHeaders() {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
}

async function parseResponse(response) {
    const contentType =
        response.headers.get('content-type') ?? '';

    if (
        response.status === 204 ||
        !contentType.includes('application/json')
    ) {
        return null;
    }

    return response.json();
}

function createHttpError(
    result,
    fallbackMessage
) {
    const error = new Error(
        result?.message || fallbackMessage
    );

    error.status = result?.status ?? null;
    error.validationErrors =
        result?.errors ?? null;

    return error;
}

function handleRequestError(error) {
    console.error(error);

    if (error.validationErrors) {
        showFieldErrors(
            error.validationErrors
        );

        showNotification(
            'Revisa los campos marcados.',
            'error'
        );

        focusFirstInvalidField(
            error.validationErrors
        );

        return;
    }

    showNotification(
        error.message ||
            'Ocurrió un error inesperado.',
        'error'
    );
}

// =====================================================
// Validaciones
// =====================================================

function clearFieldErrors() {
    elements.titleError.textContent = '';
    elements.descriptionError.textContent = '';
    elements.statusError.textContent = '';

    elements.title.removeAttribute(
        'aria-invalid'
    );

    elements.description.removeAttribute(
        'aria-invalid'
    );

    elements.status.removeAttribute(
        'aria-invalid'
    );
}

function showFieldErrors(errors) {
    clearFieldErrors();

    const fieldMap = {
        title: {
            input: elements.title,
            error: elements.titleError,
        },

        description: {
            input: elements.description,
            error: elements.descriptionError,
        },

        status: {
            input: elements.status,
            error: elements.statusError,
        },
    };

    Object.entries(errors).forEach(
        ([field, messages]) => {
            const fieldElements =
                fieldMap[field];

            if (!fieldElements) {
                return;
            }

            const message = Array.isArray(messages)
                ? messages[0]
                : messages;

            fieldElements.error.textContent =
                message;

            fieldElements.input.setAttribute(
                'aria-invalid',
                'true'
            );
        }
    );
}

function focusFirstInvalidField(errors) {
    const fieldOrder = [
        'title',
        'description',
        'status',
    ];

    const firstInvalidField =
        fieldOrder.find(
            field => errors[field]
        );

    if (
        firstInvalidField &&
        elements[firstInvalidField]
    ) {
        elements[firstInvalidField].focus();
    }
}

// =====================================================
// Notificaciones
// =====================================================

function showNotification(
    message,
    type = 'success'
) {
    elements.notification.textContent =
        message;

    elements.notification.className =
        `notification ${type}`;

    elements.notification.hidden = false;
}

function hideNotification() {
    elements.notification.textContent = '';
    elements.notification.className =
        'notification';

    elements.notification.hidden = true;
}

// =====================================================
// Renderizado
// =====================================================

function renderTasks() {
    updateTaskCounter();

    if (state.tasks.length === 0) {
        elements.emptyMessage.hidden = false;
        elements.taskList.innerHTML = '';
        return;
    }

    elements.emptyMessage.hidden = true;

    elements.taskList.innerHTML =
        state.tasks
            .map(createTaskCard)
            .join('');
}

function createTaskCard(task) {
    const description = task.description
        ? escapeHtml(task.description)
        : '<span class="empty">Sin descripción</span>';

    const statusLabel =
        getStatusLabel(task.status);

    const isDeleting =
        state.deletingTaskId === task.id;

    return `
        <article
            class="task-card ${escapeHtml(task.status)}"
            data-task-id="${task.id}"
        >
            <div class="task-card-header">
                <h3 class="task-card-title">
                    ${escapeHtml(task.title)}
                </h3>

                <span
                    class="task-status ${escapeHtml(task.status)}"
                >
                    ${escapeHtml(statusLabel)}
                </span>
            </div>

            <p class="task-card-description">
                ${description}
            </p>

            <div class="task-card-footer">
                <span class="task-date">
                    ID #${task.id}
                </span>

                <div class="task-actions">
                    <button
                        type="button"
                        class="edit-button"
                        data-action="edit"
                        data-id="${task.id}"
                        ${isDeleting ? 'disabled' : ''}
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="delete-button"
                        data-action="delete"
                        data-id="${task.id}"
                        ${isDeleting ? 'disabled' : ''}
                    >
                        ${
                            isDeleting
                                ? 'Eliminando...'
                                : 'Eliminar'
                        }
                    </button>
                </div>
            </div>
        </article>
    `;
}

function updateTaskCounter() {
    const total = state.tasks.length;

    elements.taskCount.textContent =
        total === 1
            ? '1 tarea'
            : `${total} tareas`;
}

function getStatusLabel(status) {
    return (
        STATUS_LABELS[status] ??
        'Estado desconocido'
    );
}

// =====================================================
// Estado visual
// =====================================================

function showLoadingState() {
    elements.loadingMessage.hidden = false;
}

function hideLoadingState() {
    elements.loadingMessage.hidden = true;
}

function setTaskDeleteButtonLoading(
    taskId,
    isLoading
) {
    const button =
        elements.taskList.querySelector(
            `button[data-action="delete"][data-id="${taskId}"]`
        );

    const editButton =
        elements.taskList.querySelector(
            `button[data-action="edit"][data-id="${taskId}"]`
        );

    if (button) {
        button.disabled = isLoading;

        button.textContent = isLoading
            ? 'Eliminando...'
            : 'Eliminar';
    }

    if (editButton) {
        editButton.disabled = isLoading;
    }
}

// =====================================================
// Utilidades
// =====================================================

function findTaskById(taskId) {
    return state.tasks.find(
        task => Number(task.id) === Number(taskId)
    );
}

function escapeHtml(value) {
    const div =
        document.createElement('div');

    div.textContent =
        String(value ?? '');

    return div.innerHTML;
}

// =====================================================
// Inicio
// =====================================================

initializeApp();