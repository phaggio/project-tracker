import { Project } from '../models';
import { Request, Response } from 'express';

const findAll = (request: Request, response: Response) => {
  Project.find(request.query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const createNewProject = (request: Request, response: Response) => {
  Project.create(request.body)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
}

export {
  findAll,
  createNewProject
}