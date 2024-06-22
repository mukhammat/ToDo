const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const {
    getTasks,
    createTask,
    putTask,
    deleteTask,
} = require('../controller/tasks');

router.post(
    '/tasks',
    [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('description')
            .not()
            .isEmpty()
            .withMessage('Description is required')
            .isLength({ min: 5, max: 20 })
            .withMessage('Min 5, Max 20'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createTask
);

router.put(
    '/tasks/:id',
    [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('description')
            .not()
            .isEmpty()
            .withMessage('Description is required')
            .isLength({ min: 5, max: 20 })
            .withMessage('Min 5, Max 20'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    putTask
);

router.get('/tasks', getTasks);
router.delete('/tasks/:id', deleteTask);

router.get('/another-route', (req, res) => {
    // router code here
});

module.exports = router;
