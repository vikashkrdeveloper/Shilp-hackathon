import express from 'express';
import { LogoutAdmin, SignInAdmin, SignUpAdmin, passwordChange } from '../../../controllers/admin/SignUp_SignIn_LogOut.js';

export const adminAuthRoute = express.Router();

adminAuthRoute.get('/logout', LogoutAdmin);

adminAuthRoute.post('/signup/', SignUpAdmin);
adminAuthRoute.post('/signin/', SignInAdmin);


adminAuthRoute.patch('/password/update/', passwordChange);

