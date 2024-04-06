import { comparehashpasswordfunction, hashpasswordfunction } from "../../helpers/password.js";
import { adminDataModel } from "../../models/admin/adminDataSchema.js";

export const SignUpAdmin = async (req, res) => {
    try {
        const { admin_Name, admin_Id, admin_Mobile_Number, password, role } = req.body;
        if (admin_Name && admin_Id && admin_Mobile_Number && password && role) {
            const verify_Admin_Id = await adminDataModel.findOne({ admin_Id });
            if (!verify_Admin_Id) {
                const verify_Admin_Mobile_Number = await adminDataModel.findOne({ admin_Mobile_Number });
                if (!verify_Admin_Mobile_Number) {
                    const hashpassword = await hashpasswordfunction(password);
                    const insert_Admin_Data = await adminDataModel({ admin_Name, admin_Id, admin_Mobile_Number, password: hashpassword, role });
                    await insert_Admin_Data.save();
                    res.status(200).json({ message: "Admin data are created", data: insert_Admin_Data, status: 200 });
                    return;
                } else {
                    res.status(402).json({ message: "Admin mobile number already exist", status: 402 });
                    return;
                }
            } else {
                res.status(401).json({ message: "Admin id already exist", status: 401 });
                return;
            }
        } else {
            res.status(400).json({ message: "All field require", status: 400 });
            return;
        }
    } catch (error) {
        res.status(500).json({ error: "Some technical issue", status: 500 })
        return;
    }
}

export const SignInAdmin = async (req, res) => {
    try {
        const { admin_Id, password } = req.body;
        if (admin_Id && password) {
            const verify_Admin_Id = await adminDataModel.findOne({ admin_Id });
            if (verify_Admin_Id) {
                const hashpassword = verify_Admin_Id.password;
                const password_Verify = await comparehashpasswordfunction(password, hashpassword);
                if (password_Verify) {
                    const token = await verify_Admin_Id.generatAdminToken();
                    res.cookie("Admin_Auth_Verification_Token", token, {
                        path: '/',
                        httpOnly: true,
                        expires: new Date(new Date().getTime() + 600 * 100 * 10000)
                    })
                    res.status(200).json({ message: "Login Sucessfuly", data: verify_Admin_Id, status: 200 });
                    return;
                } else {
                    res.status(401).json({ message: "Invalid login details", status: 401 });
                    return;
                }
            } else {
                res.status(401).json({ message: "Invalid login details", status: 401 });
                return;
            }
        } else {
            res.status(400).json({ message: "All field require", status: 400 });
            return;
        }

    } catch (error) {
        res.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 });
        return;
    }
}

export const LogoutAdmin = async (req, res) => {
    try {
        const token = req.cookies.Admin_Auth_Verification_Token;
        if (token) {
            res.clearCookie("Admin_Auth_Verification_Token", { path: '/', httpOnly: true });
            res.status(200).json({ message: "Admin logout sucessfully", status: 200 });
            return;
        } else {
            res.status(400).json({ message: "Admin Already logout", status: 400 });
        }

    } catch (error) {
        res.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 });
        return;
    }
}

export const passwordChange = async (req, res) => {
    try {
        const { admin_Id, new_Password, conform_Password } = req.body;
        if (admin_Id && new_Password && conform_Password) {
            const verify_Admin_Id = await adminDataModel.findOne({ admin_Id });
            if (verify_Admin_Id) {
                if (String(new_Password) === String(conform_Password)) {
                    const hashpassword = await hashpasswordfunction(new_Password);
                    await adminDataModel.findOneAndUpdate({ admin_Id }, { password: hashpassword });
                    res.status(200).json({ message: "Admin password  update sucessfully", status: 200 });
                    return;
                }
                else {
                    res.status(402).json({ message: "Password and conform password are not matched", status: 402 });
                    return;
                }
            } else {
                res.status(401).json({ message: "Invalid Admin Id Please provide valid Admin Id", status: 401 });
                return;
            }
        } else {
            res.status(400).json({ message: "All field require", status: 400 });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 })
        return;

    }
}