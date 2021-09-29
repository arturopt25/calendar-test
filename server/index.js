const express = require('express');
const morgan  = require('morgan');
const fs = require('fs');
const path = require('path');

const front_end = express();
const PORT = process.env.PORT || 3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

front_end.use(morgan('combined', { stream: accessLogStream }));
front_end.use(express.static(path.join(__dirname, '../build')));

front_end.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

front_end.set('port', PORT);
front_end.listen(PORT);

console.log(`Frontend corriendo en localhost:${PORT}`)