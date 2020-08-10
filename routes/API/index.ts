import { Router } from 'express';
import projectRoutes from './project';
import featureRoutes from './feature';

const router: Router = Router();

router.use('/project', projectRoutes);
router.use('/feature', featureRoutes);

export default router;