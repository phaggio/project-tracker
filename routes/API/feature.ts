import { Router } from 'express';
import { findAll, create } from '../../controller/featureController';

const router: Router = Router();

router.route('/')
  .get(findAll)
  .post(create)


export default router;