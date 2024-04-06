import bcrypt from 'bcrypt';

export const hashpasswordfunction = async (password) => {
    try {
        const salt = 12;
        const hashpassword = await bcrypt.hash(password, salt);
        return hashpassword;

    } catch (error) {
        console.log(`some technical issue password hash`);
    }
}
export const comparehashpasswordfunction = async (password, hashpassword) => {
    try {
        const comparehashpassword = await bcrypt.compare(password, hashpassword);
        return comparehashpassword;

    } catch (error) {
        console.log(`some technical issue password compare`);
    }
}