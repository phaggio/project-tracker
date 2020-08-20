import { Router } from 'express';
import { findAll, findById, findByProjectId, createNewFeature } from '../../controller/featureController';

const router: Router = Router();

router.route('/')
  .get(findAll)
  .post(createNewFeature)

router.route('/byProjectId')
  .get(findByProjectId)

router.route('/id')
  .get(findById)

export default router;