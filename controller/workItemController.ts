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

export {
  createNewWorkItem,
  findAllWorkItems
}