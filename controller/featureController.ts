import { Feature } from '../models';
import { Request, Response } from 'express';

const findAll = (request: Request, response: Response) => {
  Feature.find(request.query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const create = (request: Request, response: Response) => {
  Feature.create(request.body)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
}

export {
  findAll,
  create
}