import { Router } from 'express';
import {
	loginController,
	logoutController,
	signUpContrtoller,
	tokenController,
} from '../controllers/auth';

const authRouter = Router();

authRouter.post('/signin', loginController);
authRouter.post('/signup', signUpContrtoller);
authRouter.post('/logout', logoutController);
authRouter.get('generate-token', tokenController);

export default authRouter;
