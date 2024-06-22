const express = require('express');
const tasks = require('./routes/tasks');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(tasks);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
