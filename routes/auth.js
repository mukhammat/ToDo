const router = require('express').Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { createUser, findUserByUsername } = require('../models/user');
const { validateRegister, validateLogin } = require('../middleware/validate');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Registration
router.post('/register', validateRegister, async (req, res) => {
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
});

// Sign In
router.post('/login', validateLogin, async (req, res) => {
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
});

router.get('/another-route', (req, res) => {
    // router code here
});

module.exports = router;
