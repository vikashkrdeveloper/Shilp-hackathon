import mongoose from "../../src/config/db.js";
import jwt from 'jsonwebtoken';
const UserRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    mobile_Number: {
        type: Number,
        trim: true,
        default: null
    },
    aadhar_Number: {
        type: Number,
        trim: true,
        default: null
    },
    email_Id: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    user_Id: {
        type: String,
        trim: true,
        default: null
    },
    gender: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    password: {
        type: String,
        trim: true,
    },
    profile_Image: {
        data: Buffer,
        Content: String,
    },
    tokens: [
        {
            token: {
                type: String,
                trim: true,
            }
        }
    ]
}, { timestamps: true })


UserRegistrationSchema.methods.generateUserToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECURTY_KEY);
        if (token) {
            this.tokens = this.tokens.concat({ "token": token });
            await this.save();
            return token;
        } else {
            throw new Error("Token not generated");
        }

    } catch (error) {
        console.log(`Some technical issue `, error);
    }
}

export const UserRegistrationModel = mongoose.model('User_Details', UserRegistrationSchema);