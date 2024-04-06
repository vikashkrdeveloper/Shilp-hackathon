import { adminDataModel } from "../../models/admin/adminDataSchema.js";
import jwt from 'jsonwebtoken';
export const AdminAuthData = async (req, res, next) => {
    try {
        const token = req.cookies.Admin_Auth_Verification_Token;
        if (token) {
            const verify_token = await jwt.verify(token, process.env.SECURTY_KEY);
            if (!verify_token) {
                res.status(401).json({ message: "Please provide a valid token ", status: 401 });
                return;
            } else {
                const Find_Admin_Data = await adminDataModel.findOne({ _id: verify_token._id, "tokens.token": token }).select('-__v').select('-password').select('-updatedAt').select("-tokens").select("-createdAt");
                if (!Find_Admin_Data) {
                    throw new Error("Admin Not  Found");
                } else {
                    req.Auth_Admin_Data = Find_Admin_Data;
                    next();
                }
            }

        } else {
            res.status(401).json({ message: "Unauthorize admin", status: 401 });
            return;
        }

    } catch (error) {
        res.status(401).json({ message: "Unauthorize admin", status: 401 });
        return;
    }
}