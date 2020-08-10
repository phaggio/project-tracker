import { Router } from 'express';
import { findAll, createNewFeature } from '../../controller/featureController';

const router: Router = Router();

router.route('/')
  .get(findAll)
  .post(createNewFeature)


export default router;