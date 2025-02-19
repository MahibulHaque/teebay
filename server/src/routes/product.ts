import { Router } from "express";
import { AuthMiddleWare } from "../middlewares/authMiddleware";
import { createProductController, createPurchaseRecordController, createRentalRecordController } from "../controllers/product";

const productRouter = Router();

productRouter.post('/create-product', AuthMiddleWare, createProductController)
productRouter.post('/create-purchase-record', AuthMiddleWare, createPurchaseRecordController)
productRouter.post('/create-rental-record', AuthMiddleWare, createRentalRecordController)

export default productRouter