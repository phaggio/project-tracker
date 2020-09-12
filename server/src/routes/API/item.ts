import { Router } from 'express';
import {
  createNewItem,
  findAllItems,
  findItemById,
  findItemsByParentId,
  findItemsByType,
  findItemsByQuery,
  updateItemById
} from '../../controller/itemController';

const router: Router = Router();

router.route('/new')
  .post(createNewItem)

router.route('/')
  .get(findAllItems)

router.route('/id/:id')
  .get(findItemById)
  .put(updateItemById)

router.route('/parentId/:id')
  .get(findItemsByParentId)

router.route('/query')
  .get(findItemsByQuery)

router.route('/type/:type')
  .get(findItemsByType)



export default router