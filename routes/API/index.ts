import { Router } from 'express';
import projectRoutes from './project';
import itemRoutes from './item';
import userRoutes from './user';

const router: Router = Router();

router.use('/project', projectRoutes);
router.use('/item', itemRoutes);
router.use('/user', userRoutes);

export default router;