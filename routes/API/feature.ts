import { Router } from 'express';
import {
  createNewFeature,
  findAll,
  findById,
  findByProjectId,
  updateFeatureById
} from '../../controller/featureController';

const router: Router = Router();

router.route('/')
  .get(findAll)
  .post(createNewFeature)

router.route('/:id')
  .get(findById)
  .put(updateFeatureById)

router.route('/projectId/:id')
  .get(findByProjectId)

export default router;