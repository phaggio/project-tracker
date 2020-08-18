import { WorkItem } from '../models';
import { Request, Response } from 'express';

const findAllWorkItems = (request: Request, response: Response) => {
  WorkItem
    .find()
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err))
}

export {
  findAllWorkItems
}