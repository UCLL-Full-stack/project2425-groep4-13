import jwt from 'jsonwebtoken';


const generateJWTtoken = (email: string): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };

    try {
        return jwt.sign({ email }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error)
        throw new Error('Error while generating JWT token, see server log for details');
    }

};

export { generateJWTtoken };