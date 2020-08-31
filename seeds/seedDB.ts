import userSeed from './userSeed';
import projectSeed from './projectSeed';
import itemSeed from './itemSeed'

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
      modelName: db.Item,
      data: itemSeed
    }
  ]

  for (const model of models) {
    const collectionName = model.modelName.collection.collectionName;

    await model.modelName.collection
      .drop() // drop existing collection
      .then(() => {
        console.log(`Dropped collection: ${collectionName}`)
      });

    await model.modelName
      .createCollection() // create new collection in db
      .then(() => {
        console.log(`Created collection: ${collectionName}`)
      });

    await model.modelName.collection
      .insertMany(model.data) // seed the data in that collection
      .then(res => {
        const count = res.result.n;
        console.log(`${count} ${collectionName} documents inserted!`)
      });
  }
  process.exit(0);
}

seedDB();