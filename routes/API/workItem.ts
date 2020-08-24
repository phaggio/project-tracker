import { Router } from 'express';
import {
  createNewWorkItem,
  findAllWorkItems,
  findWorkItemsByParentId
} from '../../controller/workItemController';

const router: Router = Router();

router.route('/new')
  .post(createNewWorkItem)

router.route('/')
  .get(findAllWorkItems)

router.route('/parentId/:id')
  .get(findWorkItemsByParentId)

export default router