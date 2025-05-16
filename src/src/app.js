const express = require('express');
const authRoute = require('../route/authRoute');
const authorRoute = require('../route/authorRoute');
const bookRoute = require('../route/bookRoute');
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Routes
app.use('/api', authRoute);
app.use('/api/authors', authorRoute);
app.use('/api/books', bookRoute);



module.exports = app;
