import express from 'express';
import { UserProfileData } from '../../../controllers/users/UserProfileData.js';
import { LogoutUser } from '../../../controllers/users/UserLogin_LogOut.js';

export const AuthUserPanelDataRoute = express.Router();

AuthUserPanelDataRoute.get('/profile/', UserProfileData)
AuthUserPanelDataRoute.get('/logout/', LogoutUser)
