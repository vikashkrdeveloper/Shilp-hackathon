import database from "../../src/config/db.js";
import jwt from 'jsonwebtoken';

export let adminDataModel;

if (database.models && database.models.admin_data) {
    adminDataModel = database.model('admin_data');
} else {
    const adminDataSchema = new database.Schema({
        admin_Name: {
            type: String,
            lowercase: true,
            trim: true,
            default: null,
        },
        admin_Id: {
            type: Number,
            trim: true,
            default: null,
        },
        admin_Mobile_Number: {
            type: Number,
            trim: true,
            default: null,
        },
        role: {
            type: Number,
            trim: true,
            default: 1,
        },
        password: {
            type: String,
            trim: true,
        },
        tokens: [
            {
                token: {
                    type: String,
                    trim: true,
                }
            }
        ]
    }, { timestamps: true });

    adminDataSchema.methods.generatAdminToken = async function () {
        try {
            const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECURTY_KEY);
            this.tokens = this.tokens.concat({ "token": token });
            this.save();
            return token;
        } catch (error) {
            console.log('some technical issue generate token');
        }

    }

    adminDataModel = database.model('admin_data', adminDataSchema);
}



// export const adminDataModel = database.model('admin_data', adminDataSchema);