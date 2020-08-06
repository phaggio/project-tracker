import { Project } from '../models';
import { Request, Response } from 'express';

const findAll = (request: Request, response: Response) => {
  Project.find(request.query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

export {
  findAll
}