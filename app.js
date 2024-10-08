require('dotenv').config();
const express = require('express');
const path = require('node:path');
const newRoute = require('./routes/new');
const indexRoute = require('./routes/index');

const PORT = process.env.PORT || 3000;

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath));


app.use('/new', newRoute);
app.use('/', indexRoute);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

