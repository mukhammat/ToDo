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

module.exports = { validateTask };
