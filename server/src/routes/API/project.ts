import { Router } from 'express';
import { findAllProjects, findById, createNewProject, updateProject } from '../../controller/projectController';

const router: Router = Router();

router.route('/')
  .get(findAllProjects)

router.route('/:id')
  .get(findById)
  .put(updateProject)

router.route('/new')
  .post(createNewProject)

export default router;