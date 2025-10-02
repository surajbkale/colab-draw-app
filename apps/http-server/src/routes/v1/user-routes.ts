import { Router } from 'express';
import { SignUp, SignIn } from '../../controllers';

const userRouter: Router = Router();

userRouter.post('/signup', SignUp);
userRouter.post('/signin', SignIn);

export { userRouter };