const router = require('express').Router();
const { validateTask } = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');
const {
    getTasks,
    createTask,
    putTask,
    deleteTask,
} = require('../controller/tasks');

// Аутентификация для всех маршрутов
router.use(authenticate);

// Маршруты с валидацией
router.post('/tasks', validateTask, createTask);
router.put('/tasks/:id', validateTask, putTask);

// Маршруты без валидации
router.get('/tasks', getTasks);
router.delete('/tasks/:id', deleteTask);

router.get('/another-route', (req, res) => {
    // router code here
});

module.exports = router;
