import { Router } from 'express';
import { createNewWorkItem, findAllWorkItems } from '../../controller/workItemController';

const router: Router = Router();

router.route('/')
  .get(findAllWorkItems)

router.route('/new')
  .post(createNewWorkItem)


export default router