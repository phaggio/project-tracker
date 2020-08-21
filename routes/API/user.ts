import { Router } from 'express';
import { findUser, createNewUser } from '../../controller/userController';

const router: Router = Router();

router.route('/')
  .get(findUser)

router.route('/new')
  .post(createNewUser)

export default router;