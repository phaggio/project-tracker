import { User } from '../models';
import { Request, Response } from 'express';

const findByName = (request: Request, response: Response) => {
  console.log(request.query.name);
  const name = request.query.name;
  const query: object = {
    name: {
      $regex: name,
      $options: 'i'
    }
  }
  User.find(query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const create = (request: Request, response: Response) => {
  User.create(request.body)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

export {
  findByName,
  create
};