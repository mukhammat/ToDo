const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const {
    getTasks,
    createTask,
    putTask,
    deleteTask,
} = require('../controller/tasks');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const authHeaader = req.headers.authorization;

    if (!authHeaader) {
        return res
            .status(401)
            .json({ message: 'Authorization header is missing' });
    }

    const token = authHeaader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const payload = jsonwebtoken.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
router.use(authenticate);

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
