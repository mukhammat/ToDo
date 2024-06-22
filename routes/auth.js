const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { createUser, findUserByUsername } = require('../models/user');

const JWT_SECRET = 'nohalahbi';

// Registration
router.post(
    '/register',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('Username is required')
            .isLength({ max: 20 })
            .withMessage('Max length username is 20'),
        check('password')
            .not()
            .isEmpty()
            .withMessage('Password is reqired')
            .isLength({ mix: 8 })
            .withMessage('Min length password is 8'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const existingUser = findUserByUsername(username);

        if (existingUser) {
            return req.status(400).json({ message: 'User already exists' });
        }

        const user = await createUser({ username, password });
        const token = jsonwebtoken.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    }
);

// Sign In
router.post(
    '/login',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('Username is required')
            .isLength({ max: 20 })
            .withMessage('Max length username is 20'),
        check('password')
            .not()
            .isEmpty()
            .withMessage('Password is reqired')
            .isLength({ mix: 8 })
            .withMessage('Min length password is 8'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const user = findUserByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jsonwebtoken.sign({ userid: user.id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    }
);

router.get('/another-route', (req, res) => {
    // router code here
});

module.exports = router;
