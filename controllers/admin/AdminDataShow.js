
export const AuthAdminData = async (req, res) => {
    try {
        const Auth_Admin_Data = req.Auth_Admin_Data;
        if (Auth_Admin_Data) {
            res.status(200).json({ message: "Admin Data fetch sucessfully", data: Auth_Admin_Data, status: 200 });
            return;
        } else {
            res.status(401).json({ message: "you are unauthorized admin ", status: 401 });
            return;
        }

    } catch (error) {
        res.status(500).json({ message: "Some technical issue", error: "" + error, status: 500 })
        return;
    }
}