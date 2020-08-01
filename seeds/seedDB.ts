import userSeed from './userSeed';

import mongoose from 'mongoose';
import * as db from '../models';
console.log('seeding...');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project-tracker', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const seedDB = async () => {
  const models = [
    {
      modelNames: db.User,
      data: userSeed
    }
  ]

  for (const model of models) {
    await model.modelNames.collection
      .deleteMany({})
      .then(() =>
        model.modelNames.collection
          .insertMany(model.data)
          .then(res =>
            console.log(`${res.result.n} ${model.modelNames.collection.name} records inserted!`)
          )
      )
      .catch(err => console.error(err));
  }
  process.exit(0);
}

seedDB();