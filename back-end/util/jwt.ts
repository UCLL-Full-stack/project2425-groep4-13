import jwt from 'jsonwebtoken';
import { Role } from '../types';


const generateJWTtoken = ({email, role}: {email: string, role: Role}): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };

    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error)
        throw new Error('Error while generating JWT token, see server log for details');
    }

};

export { generateJWTtoken };