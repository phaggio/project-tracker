'use strict';

const express = require('express');
const mongoose = require('mongoose');
const routes = require('../routes');

const app = express();
const LOCAL_PORT = 8000;
const PORT = process.env.PORT || LOCAL_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(`${__dirname}/client/build`));
};

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/project-tracker`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(PORT, () => {
  console.log(`API Server up on http://localhost:${PORT}`)
});