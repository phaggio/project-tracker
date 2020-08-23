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
  console.log('request.query')
  console.log(request.query);
  const param = request.params;
  const query = request.query;
  console.log('request.params')
  console.log(param)
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
  console.log('request.params')
  console.log(request.params)
  const data = request.body;
  console.log('request.query.body')
  console.log(data);
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