import { Router } from 'express';
import { createNewUser, findAllUsers, findUserById } from '../../controller/userController';

const router: Router = Router();

router.route('/')
  .get(findAllUsers)

router.route('/:id')
  .get(findUserById)

router.route('/new')
  .post(createNewUser)

export default router;