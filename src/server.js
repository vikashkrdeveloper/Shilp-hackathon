import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookiparser from 'cookie-parser';
import cors from 'cors';
import { adminAuthRoute } from '../routes/auth/admin/authentication.js';
import { AdminAuthData } from '../middleware/admin/AdminAuthData.js';
import { AuthAdminPanelDataRoute } from '../routes/auth/admin/AuthAdminPanelData.js';
import { UserAuthRoute } from '../routes/auth/user/authenticationUser.js';
import { AuthUserPanelDataRoute } from '../routes/auth/user/AuthUserPanelData.js';
import { UserAuthData } from '../middleware/user/UserAuthDataMiddleware.js';
import { fileURLToPath } from 'url';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookiparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/build")));


app.use("/api/v1/admin/auth/data/", AdminAuthData, AuthAdminPanelDataRoute);
app.use("/api/v1/admin/auth/", adminAuthRoute)
app.use("/api/v1/user/auth/", UserAuthRoute)
app.use("/api/v1/User/auth/data", UserAuthData, AuthUserPanelDataRoute)

app.get("*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});


app.get('*', (req, res) => {
    res.status(404).json({ message: "Oops page not found!!", status: 404 });
    return;
})
app.post('*', (req, res) => {
    res.status(404).json({ message: "Oops page not found!!", status: 404 });
    return;
})
app.put('*', (req, res) => {
    res.status(404).json({ message: "Oops page not found!!", status: 404 });
    return;
})
app.patch('*', (req, res) => {
    res.status(404).json({ message: "Oops page not found!!", status: 404 });
    return;
})
app.delete('*', (req, res) => {
    res.status(404).json({ message: "Oops page not found!!", status: 404 });
    return;
})

app.listen(port, () => {
    console.log(`server is listen url is : http://localhost:${port}`);
})