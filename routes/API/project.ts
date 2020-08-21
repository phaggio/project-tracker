import { Router } from 'express';
import { findAllProjects, findById, createNewProject, findByName, updateProject } from '../../controller/projectController';

const router: Router = Router();

router.route('/')
  .get(findAllProjects)

router.route('/id')
  .get(findById)

router.route('/:id')
  .put(updateProject)

router.route('/name')
  .get(findByName)

router.route('/new')
  .post(createNewProject)

export default router;