import { Project } from '../models';
import { Request, Response } from 'express';

const findAllProjects = (request: Request, response: Response) => {
  Project
    .find()
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err))
};

const findByName = (request: Request, response: Response) => {
  const name = request.query.name;
  const query: object = {
    name: {
      $regex: name,
      $options: 'i'
    }
  };
  Project
    .find(query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const findById = (request: Request, response: Response) => {
  console.log(`Project controller... querying project by ID: ${request.query._id}`)
  const query = request.query;
  Project
    .findById(query._id)
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
  findByName,
  findById,
  createNewProject,
  updateProject
}