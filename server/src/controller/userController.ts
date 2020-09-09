import { User } from '../models';
import { Request, Response } from 'express';

const createNewUser = (request: Request, response: Response) => {
  User
    .create(request.body)
    .then(data => {
      console.log(`response.statusCode = ${response.statusCode}`);
      response.json(data);
    })
    .catch(err => response.status(422).json(err));
};

const findAllUsers = (request: Request, response: Response) => {
  User
    .find()
    .then(data => response.json(data))
    .catch(err => response.json(err))
};

const findUserById = (request: Request, response: Response) => {
  const id = request.params.id
  User
    .findById(id)
    .then(data => response.json(data))
    .catch(err => response.json(err))
};

const findUser = (request: Request, response: Response) => {
  const query = request.query;
  User
    .find(query)
    .then(data => response.json(data))
    .catch(err => response.json(err))

};


export {
  createNewUser,
  findAllUsers,
  findUserById,
  findUser
};