import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const databaseURL = process.env.DATABASE_URL;
if (databaseURL) {
    mongoose.connect(databaseURL)
        .then(() => {
            console.log(`database connected!!`);
            console.log(`well done vikash developer you write a better code!!`);

        }).catch(() => {
            console.log(`database not connected!! `);
            console.log(`vikash developer you debug the all code the run `);

        }).finally(() => {
            console.log(`well done vikash developer!!`);
        })

} else {
    console.log(`database url is undefined`);
}

export default mongoose;