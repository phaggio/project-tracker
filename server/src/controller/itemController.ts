import { Item } from '../models';
import { Request, Response } from 'express';

const createNewItem = (request: Request, response: Response) => {
  Item
    .create(request.body)
    .then(data => response.json(data))
    .catch(err => console.error(err));
}

const findAllItems = (request: Request, response: Response) => {
  Item
    .find()
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err))
}

const findItemById = (request: Request, response: Response) => {
  const id = request.params.id;
  Item
    .findOne({ _id: id })
    .then(data => response.json(data))
    .catch(err => response.json(err))
}

const findItemsByParentId = (request: Request, response: Response) => {
  const parentId = request.params.id;
  Item
    .find({ parentId: parentId })
    .then(data => response.json(data))
    .catch(err => response.json(err))
}

const findItemsByType = (request: Request, response: Response) => {
  const type = request.params.type;
  Item
    .find({ type: type })
    .then(data => response.json(data))
    .catch(err => response.json(err))
}

const updateItemById = (request: Request, response: Response) => {
  const id = request.params.id;
  const data = request.body;
  Item
    .findOneAndUpdate({ _id: id }, data)
    .then(data => response.json(data))
    .catch(err => response.json(err))
};

export {
  createNewItem,
  findAllItems,
  findItemById,
  findItemsByParentId,
  findItemsByType,
  updateItemById
}