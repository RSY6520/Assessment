const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('./db');

const app = express();

const corsOptions = {
  exposedHeaders: 'Authorization',
}

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));

app.use(require('./middlewares/requestLogger'));
app.use('/api', require('./routes'));


app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
    payload: null,
  })
})

app.use((err, req, res) => {
  res.status(400).json({message:err.message || 'Internal Server Error',payload:null})
});

module.exports = app;
