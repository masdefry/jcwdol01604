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
import { loginUser, registerUserReff } from '../controllers/auth.controller';
import { LoginValidation, RegisterValidation } from '@/middlewares/validation/auth.validation';

import prisma from '@/prisma';

const router = express.Router();

router.post('/login', LoginValidation, loginUser);
router.post('/regis', RegisterValidation, registerUserReff);



export default router;