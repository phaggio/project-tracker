import { Feature } from '../models';
import { Request, Response } from 'express';

const createNewFeature = (request: Request, response: Response) => {
  Feature.create(request.body)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const findAll = (request: Request, response: Response) => {
  Feature.find(request.query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const findById = (request: Request, response: Response) => {
  const param = request.params;
  Feature.findById(param.id)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err))
};

const findByProjectId = (request: Request, response: Response) => {
  const id = request.params.id
  Feature.find({ projectId: id })
    .then(data => response.json(data))
    .catch(err => response.json(err))
};

const updateFeatureById = (request: Request, response: Response) => {
  const id = request.params.id;
  const data = request.body;
  Feature.findOneAndUpdate({ _id: id }, data)
    .then(data => response.json(data))
    .catch(err => response.json(err))
};

export {
  createNewFeature,
  findAll,
  findById,
  findByProjectId,
  updateFeatureById
}