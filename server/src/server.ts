import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import path from 'path';

const app = express();
const LOCAL_PORT = '8000';
const LOCAL_MONGODB = 'mongodb://localhost/project-tracker';
const PORT = process.env.PORT || LOCAL_PORT;
const MONGODB_URI = process.env.MONGODB_URI || LOCAL_MONGODB;

// for parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));
// for parsing application/json
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
}

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
})

app.use(routes);

// console.log out status once mongoose connected
mongoose.connection.on('connected', () => {
  console.log(`mongoose is connected`);
  console.log(`mongoose connection port: ${mongoose.connection.port}`);
  console.log(`mongoose connection host: ${mongoose.connection.host}`);
  console.log(`mongoose connection db name: ${mongoose.connection.name}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`__dirname: ${__dirname}`);
});