import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const LOCAL_PORT: String = '8000';
const PORT = process.env.PORT || LOCAL_PORT;

// for parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));
// for parsing application/json
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/client/build`));
};

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project-tracker', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(PORT, () => {
  console.log(`API Server up on http://localhost:${PORT}`);
  console.log(`running dir = ${__dirname}`);
});