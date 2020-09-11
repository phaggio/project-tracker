import { Router } from 'express';
import {
  createNewWorkItem,
  findAllWorkItems,
  findWorkItemById,
  findWorkItemsByParentId,
  findItemsByType,
  updateWorkItemById
} from '../../controller/itemController';

const router: Router = Router();

router.route('/new')
  .post(createNewWorkItem)

router.route('/')
  .get(findAllWorkItems)

router.route('/:id')
  .get(findWorkItemById)
  .put(updateWorkItemById)

router.route('/parentId/:id')
  .get(findWorkItemsByParentId)

router.route('/type/:type')
  .get(findItemsByType)


export default router