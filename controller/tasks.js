let tasks = [];
let currentId = 1; // Для генерации уникальных ID задач

// Получение всех задач
const getTasks = (req, res) => {
    res.json(tasks);
};

// Создание новой задачи
const createTask = (req, res) => {
    const task = {
        id: currentId++,
        ...req.body,
    };
    tasks.push(task);
    res.status(201).json(task);
};

// Обновление задачи по ID
const putTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id == id);

    if (taskIndex !== -1) {
        tasks[taskIndex] = { id: Number(id), ...req.body };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// Удаление задачи по ID
const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id == id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = {
    getTasks,
    createTask,
    putTask,
    deleteTask,
};
