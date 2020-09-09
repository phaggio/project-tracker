import { Project } from '../models';
import { Request, Response } from 'express';

const findAllProjects = (request: Request, response: Response) => {
  Project
    .find()
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err))
};

const findById = (request: Request, response: Response) => {
  console.log(`Project controller... querying project by ID: ${request.params.id}`)
  Project
    .findById(request.params.id)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err))
}

const createNewProject = (request: Request, response: Response) => {
  Project
    .create(request.body)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const updateProject = (request: Request, response: Response) => {
  Project
    .findOneAndUpdate({ _id: request.params.id }, request.body)
    .then(data => response.json(data))
    .catch(err => response.json(err));
}

export {
  findAllProjects,
  findById,
  createNewProject,
  updateProject
}