import { Project } from '../models';
import { Request, Response } from 'express';

// const findAll = (request: Request, response: Response) => {
//   const query = {}; // find all.
//   Project.find(query)
//     .then(data => response.json(data))
//     .catch(err => response.status(422).json(err));
// };

const findByName = (request: Request, response: Response) => {
  console.log(request.query.name);
  const name = request.query.name;
  const query: object = {
    name: {
      $regex: name,
      $options: 'i'
    }
  };
  Project.find(query)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};

const createNewProject = (request: Request, response: Response) => {
  Project.create(request.body)
    .then(data => response.json(data))
    .catch(err => response.status(422).json(err));
};



export {
  // findAll,
  findByName,
  createNewProject
}