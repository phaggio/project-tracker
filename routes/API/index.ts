import { Router } from 'express';
import projectRoutes from './project';
import featureRoutes from './feature';
import workItemRoutes from './workItem';
import userRoutes from './user';

const router: Router = Router();

router.use('/project', projectRoutes);
router.use('/feature', featureRoutes);
router.use('/workitem', workItemRoutes);
router.use('/user', userRoutes);

export default router;