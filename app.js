const express = require('express');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(auth);
app.use(tasks);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
