import { Router } from 'express';
import { findAllWorkItems } from '../../controller/workItemController';

const router: Router = Router();

router.route('/')
  .get(findAllWorkItems)


export default router