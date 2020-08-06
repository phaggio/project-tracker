import { Router } from 'express';
import { findAll } from '../../controller/projectController'

const router: Router = Router();

router.route('/projects')
  .get(findAll)

export default router;