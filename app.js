const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('DevOps CI/CD Pipeline Working Successfullyy');
});

app.listen(3000, () => {
    console.log('Application running on port 30000');
});