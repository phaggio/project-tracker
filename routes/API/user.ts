import { Router } from 'express';
import { findByName, createNewUser } from '../../controller/userController';

const router: Router = Router();

router.route('/')
  .get(findByName)
  .post(createNewUser)

export default router;