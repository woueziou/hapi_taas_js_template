const bcrypt = require('bcrypt');
const saltRounds = 10;


const PasswordUtils = {
    async hashPassword(password) {
        console.log(password);
        try {
            const hashed = await bcrypt.hash(password, saltRounds);
            return hashed;
        } catch (error) {
            console.log(error);
            throw error;
        }

    },
    async checkPassword(plain, hashed) {
        const result = await bcrypt.compare(plain, hashed);
        return result;
    }
};
module.exports = PasswordUtils;