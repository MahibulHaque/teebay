import { Router } from 'express';
import { AuthMiddleWare } from '../middlewares/authMiddleware';
import {
	createProductController,
	createPurchaseRecordController,
	createRentalRecordController,
	deleteProductController,
	updateProductDetailsController,
} from '../controllers/product';

const productRouter = Router();

productRouter.post('/create-product', AuthMiddleWare, createProductController);
productRouter.put(
	'/update-product/:productId',
	AuthMiddleWare,
	updateProductDetailsController,
);
productRouter.delete(
	'/delete-product/:productId',
	AuthMiddleWare,
	deleteProductController,
);
productRouter.post(
	'/create-purchase-record',
	AuthMiddleWare,
	createPurchaseRecordController,
);
productRouter.post(
	'/create-rental-record',
	AuthMiddleWare,
	createRentalRecordController,
);

export default productRouter;
