import { Router } from 'express';
import { findAll, create } from '../../controller/projectController'

const router: Router = Router();

router.route('/project')
  .get(findAll)
  .post(create)

export default router;