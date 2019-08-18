const express = require('express');
const path = require('path');
const app = express();

const port = 4012;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Hosting react app on port ${port}`));