import { join } from 'path';
import { Request, Response, Router } from 'express';

const router = Router();
const apiRoutes = require('./API');





router.use(`/api`, apiRoutes);
router.use((request: Request, response: Response) => {
  response.sendFile(join(__dirname, `../client/public/index.html`));
});

export default router;