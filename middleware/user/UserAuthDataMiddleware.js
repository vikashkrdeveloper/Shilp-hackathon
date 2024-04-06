import jwt from 'jsonwebtoken';
import { UserRegistrationModel } from '../../models/user/UserRegistration.js';
export const UserAuthData = async (req, res, next) => {
    try {
        const token = req.cookies.User_Auth_token;
        if (token) {
            const verify_token = await jwt.verify(token, process.env.SECURTY_KEY);
            if (!verify_token) {
                res.status(401).json({ message: "Please provide a valid token ", status: 401 });
                return;
            } else {
                const Find_User_Data = await UserRegistrationModel.findOne({ _id: verify_token._id, "tokens.token": token }).select('-__v').select('-password').select('-updatedAt').select("-tokens").select("-createdAt");
                if (!Find_User_Data) {
                    throw new Error("User Not  Found");
                } else {
                    req.User_Auth_Data = Find_User_Data;
                    next();
                }
            }

        } else {
            res.status(401).json({ message: "Unauthorize User", status: 401 });
            return;
        }

    } catch (error) {
        res.status(401).json({ message: "Unauthorize User", status: 401 });
        return;
    }
}