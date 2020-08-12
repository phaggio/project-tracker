import { Router } from 'express';
import { findAll, findByName, createNewProject } from '../../controller/projectController';

const router: Router = Router();

router.route('/')
  // .get(findAll)
  .get(findByName)
  .post(createNewProject)

export default router;