import { Router } from 'express';
import { findAll, createNewProject } from '../../controller/projectController';

const router: Router = Router();

router.route('/')
  .get(findAll)
  .post(createNewProject)

export default router;