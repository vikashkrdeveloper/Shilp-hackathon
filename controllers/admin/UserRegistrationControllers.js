import { hashpasswordfunction } from "../../helpers/password.js";
import { UserRegistrationModel } from "../../models/user/UserRegistration.js";

export const UserRegistrationControllers = async (req, res) => {
    try {
        const { name, father_name, mother_name, mobile_Number, aadhar_Number, pan_Number, email_Id, date_of_birth, gender, category, address, pincode, state, district } = req.body;
        if (name && father_name && mother_name && mobile_Number && aadhar_Number && pan_Number && date_of_birth && email_Id && gender && category && address && pincode && state && district) {
            const aadhar_Number_Verify = await UserRegistrationModel.findOne({ aadhar_Number });
            if (!aadhar_Number_Verify) {
                const pan_Number_Verify = await UserRegistrationModel.findOne({ pan_Number });
                if (!pan_Number_Verify) {
                    const email_Id_Verify = await UserRegistrationModel.findOne({ email_Id });
                    if (!email_Id_Verify) {
                        const signatureImageVerify = req.files["signature"];
                        const profile_ImageVerify = req.files["profile_Image"]
                        if (signatureImageVerify) {
                            if (profile_ImageVerify) {
                                const profile_Image = profile_ImageVerify[0].buffer;
                                const signatureImage = signatureImageVerify[0].buffer;
                                const User_name = name.substring(0, 6);
                                const getUTCFullYear = new Date().getUTCFullYear();
                                const password_genrate = User_name + getUTCFullYear;
                                const password = await hashpasswordfunction(password_genrate);
                                const InsertUserData = await UserRegistrationModel({ name, father_name, mother_name, mobile_Number, aadhar_Number, pan_Number, email_Id, gender, category, address, pincode, profile_Image: { data: profile_Image }, signature: { data: signatureImage }, date_of_birth, state, district, password })
                                await InsertUserData.save();
                                let profile_Image_buff = new Buffer.from(profile_Image);
                                let signatureImage_buff = new Buffer.from(profile_Image);
                                let base64data_profile_Image = profile_Image_buff.toString('base64');
                                let base64data_Signature = signatureImage_buff.toString('base64');
                                const profile_Image_Url = `data:image/jpeg;base64,${base64data_profile_Image}`;
                                const Signature_Image_Url = `data:image/jpeg;base64,${base64data_Signature}`;
                                const User_Data_Filter = {
                                    _id: InsertUserData._id,
                                    name: InsertUserData.name,
                                    father_name: InsertUserData.father_name,
                                    mother_name: InsertUserData.mother_name,
                                    registration_Number: InsertUserData.registration_Number,
                                    mobile_Number: InsertUserData.mobile_Number,
                                    aadhar_Number: InsertUserData.aadhar_Number,
                                    pan_Number: InsertUserData.pan_Number,
                                    email_Id: InsertUserData.email_Id,
                                    gender: InsertUserData.gender,
                                    category: InsertUserData.category,
                                    address: InsertUserData.address,
                                    pincode: InsertUserData.pincode,
                                    state: InsertUserData.state,
                                    district: InsertUserData.district,
                                    Admission_Date: InsertUserData.Admission_Date,
                                    date_of_birth: InsertUserData.date_of_birth
                                }
                                res.status(200).json({ message: "User registration sucessfully", profile_Image: { profile_Image_Url }, Signature_Image: { Signature_Image_Url }, data: User_Data_Filter, status: 200 });
                            } else {
                                res.status(400).json({ message: "All field Require", status: 400 });
                                return;
                            }
                        } else {
                            res.status(400).json({ message: "All field Require", status: 400 });
                            return;
                        }

                    } else {
                        res.status(403).json({ message: "User Email Id Already exist", status: 403 });
                        return;
                    }
                } else {
                    res.status(402).json({ message: "User Pan Number Already exist", status: 402 });
                    return;
                }
            } else {
                res.status(401).json({ message: "User Aadhar Number Already exist", status: 401 });
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