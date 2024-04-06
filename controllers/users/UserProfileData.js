export const UserProfileData = async (req, res) => {
    try {
        const User_Auth_Data = req.User_Auth_Data;
        if (User_Auth_Data) {
            res.status(200).json({ message: "User data fetch sucessfully", data: User_Auth_Data, status: 200 });
            return;
        } else {
            res.status(401).json({ message: "Unauthorised User", status: 401 });
            return;
        }

    } catch (error) {
        res.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 });
        return;
    }
}