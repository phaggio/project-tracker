import { Router } from 'express';
import { findByName, create } from '../../controller/userController';

const router: Router = Router();

router.route('/')
  .get(findByName)
  .post(create)

export default router;