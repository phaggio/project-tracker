import { Router } from 'express';
import { findByName, createNewProject } from '../../controller/projectController';

const router: Router = Router();

router.route('/')
  .get(findByName)

router.route('/new')
  .post(createNewProject)

export default router;