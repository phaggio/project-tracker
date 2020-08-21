import { User } from '../models';
import { Request, Response } from 'express';

const findUser = (request: Request, response: Response) => {
  const query = request.query;
  User.find(query)
    .then(data => response.json(data))
    .catch(err => response.json(err))

}

const findByName = (request: Request, response: Response) => {
  console.log(request.query.name);
  const name = request.query.name;
  const query: object = {
    lastName: {
      $regex: name,
      $options: 'i'
    }
  };
  User.find(query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};


const createNewUser = (request: Request, response: Response) => {
  console.log('express request.body:')
  console.log(request.body);

  User.create(request.body)
    .then(data => {
      console.log(`response.statusCode = ${response.statusCode}`);
      response.json(data);
    })
    .catch(err => response.status(422).json(err));
};

export {
  findUser,
  findByName,
  createNewUser
};