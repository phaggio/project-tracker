import userSeed from './userSeed';
import projectSeed from './projectSeed';

import mongoose from 'mongoose';
import * as db from '../models';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project-tracker', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const seedDB = async () => {
  const models = [
    {
      modelNames: db.User,
      data: userSeed
    },
    {
      modelNames: db.Project,
      data: projectSeed
    }
  ]

  for (const model of models) {
    await model.modelNames.collection
      // deletes all existing collections in the db
      .deleteMany({})
      // insert seed data collection to db
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