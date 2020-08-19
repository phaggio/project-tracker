import { Feature } from '../models';
import { Request, Response } from 'express';

const findAll = (request: Request, response: Response) => {
  Feature.find(request.query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const findByProjectId = (request: Request, response: Response) => {
  console.log(request.query)
  const projectId = request.query.projectId;
  const query: object = {
    projectId: {
      $regex: projectId,
      $options: 'i'
    }
  }
  Feature.find(query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const createNewFeature = (request: Request, response: Response) => {
  Feature.create(request.body)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
}

export {
  findAll,
  findByProjectId,
  createNewFeature
}