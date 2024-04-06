import express from 'express';
import { UserPasswordChange, UserLogin, userSignin } from '../../../controllers/users/UserLogin_LogOut.js';

export const UserAuthRoute = express.Router();

// UserAuthRoute.get('/logout', LogoutAdmin);

// UserAuthRoute.post('/signup/', SignUpAdmin);
UserAuthRoute.post('/signin/', userSignin);
UserAuthRoute.post('/signup/', UserLogin);


UserAuthRoute.patch('/password/update/:registration_Number', UserPasswordChange);

