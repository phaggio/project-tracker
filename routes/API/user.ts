import { Router } from 'express';
import { findByName, createNewUser } from '../../controller/userController';

const router: Router = Router();

router.route('/')
  .get(findByName)

router.route('/new')
  .post(createNewUser)

export default router;