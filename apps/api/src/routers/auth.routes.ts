// import { Router } from 'express';
// import { authUser } from '../controllers/auth.controller';

// export class authRoutes {
//     private router: Router;
//     private AuthUser: authUser;

//     constructor() {
//         this.router = Router();
//         this.AuthUser = new authUser();
//         this.initializeRoutes();

//     }
// }

import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { LoginValidation, RegisterValidation } from '@/middlewares/validation/auth.validation';

import prisma from '@/prisma';
import { verifyEmail } from '@/controllers/verify.email';
import { forgotPassword, resetPassword } from '@/controllers/forgot.password';

const router = express.Router();

router.post('/login', LoginValidation, loginUser);
router.post('/regis', RegisterValidation, registerUser);
router.get('/verify-email', verifyEmail);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);



export default router;