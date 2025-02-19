import { Router } from 'express';
import authRouter from './auth';
import productRouter from './product';

const router = Router();

router.use('/auth', authRouter);
router.use('/product-management', productRouter)
export default router;
