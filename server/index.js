const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const bookRouter = require('./routes/book-router');
const apiPort = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => { res.send('Hello World!') });
app.use('/api', bookRouter);

app.listen(apiPort, () => console.log(`Sever running on port ${apiPort}`));
