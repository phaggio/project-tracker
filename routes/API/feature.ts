import { Router } from 'express';
import { findAll, findByProjectId, createNewFeature } from '../../controller/featureController';

const router: Router = Router();

router.route('/')
  .get(findAll)
  .post(createNewFeature)

router.route('/byProjectId')
  .get(findByProjectId)

export default router;