import { WorkItem } from '../models';
import { Request, Response } from 'express';

const createNewWorkItem = (request: Request, response: Response) => {
  WorkItem
    .create(request.body)
    .then(data => response.json(data))
    .catch(err => console.error(err));
}

const findAllWorkItems = (request: Request, response: Response) => {
  WorkItem
    .find()
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err))
}

const findWorkItemById = (request: Request, response: Response) => {
  const id = request.params.id;
  WorkItem
    .findOne({ _id: id })
    .then(data => response.json(data))
    .catch(err => response.json(err))
}

const findWorkItemsByParentId = (request: Request, response: Response) => {
  const parentId = request.params.id;
  WorkItem
    .find({ parentId: parentId })
    .then(data => response.json(data))
    .catch(err => response.json(err))
}

const updateWorkItemById = (request: Request, response: Response) => {
  const id = request.params.id;
  console.log('request.params')
  console.log(request.params)
  const data = request.body;
  console.log('request.query.body')
  console.log(data);
  WorkItem.findOneAndUpdate({ _id: id }, data)
    .then(data => response.json(data))
    .catch(err => response.json(err))
};

export {
  createNewWorkItem,
  findAllWorkItems,
  findWorkItemById,
  findWorkItemsByParentId,
  updateWorkItemById
}