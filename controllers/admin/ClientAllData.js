import { UserRegistrationModel } from "../../models/user/UserRegistration.js";


export const AllUserDetailsControllers = async (req, res) => {
    try {
        const UserDetails = await UserRegistrationModel.find().select('-__v').select(('-password')).select('-createdAt').select('-updatedAt');
        res.status(200).json({ message: "User Data fetch Sucessfully", data: UserDetails, status: 200 });
        return;
    } catch (error) {
        req.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 });
        return;
    }
}