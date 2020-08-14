import userSeed from './userSeed';
import projectSeed from './projectSeed';
import featureSeed from './featureSeed';

import mongoose from 'mongoose';
import * as db from '../models';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project-tracker', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

console.log(`mongoose version: ${mongoose.version}`);
console.log(`------------------------`)

const seedDB = async () => {
  const models = [
    {
      modelName: db.User,
      data: userSeed
    },
    {
      modelName: db.Project,
      data: projectSeed
    },
    {
      modelName: db.Feature,
      data: featureSeed
    }
  ]

  for (const model of models) {
    const collectionName = model.modelName.collection.collectionName;

    await model.modelName.collection
      .drop()
      .then(() => {
        console.log(`Dropped collection: ${collectionName}`)
      });

    await model.modelName
      .createCollection()
      .then(() => {
        console.log(`Created collection: ${collectionName}`)
      });

    await model.modelName.collection
      .insertMany(model.data)
      .then(res => {
        const count = res.result.n;
        console.log(`${count} ${collectionName} documents inserted!`)
      });
  }
  process.exit(0);
}

seedDB();