import { comparehashpasswordfunction, hashpasswordfunction } from "../../helpers/password.js";
import { UserRegistrationModel } from "../../models/user/UserRegistration.js";

export const UserLogin = async (req, res) => {
    try {
        const { user_Id, password } = req.body;
        if (user_Id && password) {
            const user_Id_verify = await UserRegistrationModel.findOne({ user_Id });
            if (user_Id_verify) {
                const hashpassword = user_Id_verify.password;
                if (hashpassword) {
                    const verify_User = await comparehashpasswordfunction(password, hashpassword);
                    if (verify_User) {
                        const token = await user_Id_verify.generateUserToken();
                        res.cookie("User_Auth_token", token, {
                            path: '/',
                            httpOnly: true,
                            secure: true,
                            expires: new Date(new Date().getTime() + 600 * 100 * 10000)
                        });
                        res.status(200).json({ message: "User Login Sucessfully", status: 200 });
                        return;
                    } else {
                        res.status(401).json({ message: "Invalid Login Details", status: 401 });
                        return;
                    }
                } else {
                    res.status(401).json({ message: "Invalid Login Details", status: 401 });
                    return;
                }

            } else {
                res.status(401).json({ message: "Invalid Login Details", status: 401 });
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

export const UserPasswordChange = async (req, res) => {
    try {
        const user_Id = req.params.user_Id;
        const { newPassword, conformNewPassword } = req.body;
        if (user_Id && newPassword && conformNewPassword) {
            const verifyUser = await UserRegistrationModel.findOne({ user_Id });
            if (verifyUser) {
                if (String(newPassword) === String(conformNewPassword)) {
                    const password_Verify = await comparehashpasswordfunction(newPassword, verifyUser.password);;
                    if (password_Verify) {
                        res.status(202).json({ message: "User Current password is this", status: 202 });
                        return;
                    } else {
                        const password = await hashpasswordfunction(newPassword);
                        await UserRegistrationModel.findOneAndUpdate({ user_Id }, { password });
                        res.status(200).json({ message: "User Password Update Sucessfully", status: 200 });
                        return;
                    }

                } else {
                    res.status(402).json({ message: "Password and Conform Password are not matched please enter valid password", status: 402 });
                    return;
                }
            } else {
                res.status(401).json({ message: "Invalid User", status: 401 });
                return;
            }
        } else {
            res.status(400).json({ message: "All field require", status: 400 });
            return;
        }

    }
    catch (error) {
        res.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 });
        return;
    }
}

export const LogoutUser = async (req, res) => {
    try {
        const token = req.cookies.User_Auth_token;
        if (token) {
            res.clearCookie("User_Auth_token", { path: '/', httpOnly: true });
            res.status(200).json({ message: "User logout sucessfully", status: 200 });
            return;
        } else {
            res.status(400).json({ message: "User Already logout", status: 400 });
        }

    } catch (error) {
        res.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 });
        return;
    }
}


export const userSignin = async (req, res) => {
    try {

        const { name, mobile_Number, email_Id, userid, password, conformpassword } = req.body;
        if (name && mobile_Number && email_Id && userid && password && conformpassword) {

            const userid_Verify = await UserRegistrationModel.findOne({ user_Id: userid });
            if (!userid_Verify) {
                const mobile_Number_Verify = await UserRegistrationModel.findOne({ mobile_Number });
                if (!mobile_Number_Verify) {
                    const email_Id_Verify = await UserRegistrationModel.findOne({ email_Id });
                    if (!email_Id_Verify) {
                        if (String(password) === String(conformpassword)) {
                            const hashpassword = await hashpasswordfunction(password);
                            const InserData = await UserRegistrationModel({ name, mobile_Number, email_Id, user_Id: userid, password: hashpassword });
                            await InserData.save();
                            res.status(200).json({ message: "User  Data Created Sucessfully", status: 200 })
                        } else {
                            res.status(405).json({ message: "Password and conform password are not matched", status: 405 });
                            return;
                        }

                    } else {
                        res.status(401).json({ message: "User Email Id Already exist", status: 403 });
                        return;
                    }
                } else {
                    res.status(402).json({ message: "User Phone Number Already exist", status: 401 });
                    return;
                }
            }
            else {
                res.status(403).json({ message: "User Name Already exist", status: 403 });
                return;
            }
        } else {
            res.status(400).json({ message: "All field Require", status: 400 });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 });
        return;
    }
}