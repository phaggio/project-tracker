import express from 'express';
import mongoose from 'mongoose';
// import routes from './routes';
import { ATLAS_MONGODB, LOCAL_MONGODB } from './config';


const app = express();
const LOCAL_PORT = '8000';
const PORT = process.env.PORT || LOCAL_PORT;

// for parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));
// for parsing application/json
app.use(express.json());

// process.env.NODE_ENV will be 'product' when deploy it to Heroku; otherwise, it's undefined.
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(`${__dirname}/client/build`));
// };

// app.use(routes);

app.get('/', (req, res) => res.send("HELLO"));

mongoose.connect(process.env.NODE_ENV === 'production' ? ATLAS_MONGODB : LOCAL_MONGODB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
});

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