const { check, validationResult } = require('express-validator');

const validateTask = [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('description')
        .not()
        .isEmpty()
        .withMessage('Description is required')
        .isLength({ min: 5, max: 20 })
        .withMessage('Min 5, Max 20'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateRegister = [
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
];

const validateLogin = [
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
];

module.exports = { validateTask, validateRegister, validateLogin };
