import { Router } from 'express';
import {
	loggedInUserInfoController,
	loginController,
	logoutController,
	signUpContrtoller,
	tokenController,
	verifyTokenController,
} from '../controllers/auth';
import { AuthMiddleWare } from '../middlewares/authMiddleware';

const authRouter = Router();

authRouter.post('/signin', loginController);
authRouter.post('/signup', signUpContrtoller);
authRouter.post('/logout', logoutController);
authRouter.get('/verify-token', verifyTokenController);
authRouter.post('/generate-token', tokenController);
authRouter.get('/loggedInUser',AuthMiddleWare, loggedInUserInfoController);
export default authRouter;
