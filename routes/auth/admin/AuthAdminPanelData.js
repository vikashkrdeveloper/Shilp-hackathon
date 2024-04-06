import express from 'express';
import multer from 'multer';
import { AuthAdminData } from '../../../controllers/admin/AdminDataShow.js';
import { UserRegistrationControllers } from '../../../controllers/admin/UserRegistrationControllers.js';
import { AllUserDetailsControllers } from '../../../controllers/admin/ClientAllData.js';

export const AuthAdminPanelDataRoute = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const profileimages = upload.fields([{ name: 'signature', maxCount: 1 }, { name: 'profile_Image', maxCount: 8 }])

AuthAdminPanelDataRoute.get('/profile/', AuthAdminData)

//User Details

AuthAdminPanelDataRoute.get('/all/Users/', AllUserDetailsControllers)

AuthAdminPanelDataRoute.post('/User/registration/', profileimages, UserRegistrationControllers)