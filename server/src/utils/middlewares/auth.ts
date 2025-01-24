import { Request, Response, NextFunction } from 'express';
import BlacklistedToken from '../../models/BlacklistedToken';
import jwt from 'jsonwebtoken';
import config from '../config';

export const getToken = (req: Request): string | null => {
    const authorization = req.get('Authorization') || req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', ''); // Remove "Bearer " prefix
    }
    return null;
};

const isTokenBlacklisted = async (token: string) => {
    const tokenInBlacklist = await BlacklistedToken.findOne({ token });
    return !!tokenInBlacklist;
}

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ error: "Not Authorized: Token missing" });
    }

    try {
        const isBlacklisted = await isTokenBlacklisted(token);

        if (isBlacklisted) {
            return res.status(401).json({ error: "Invalid Access Token: Blacklisted" });
        }

        // Verify and decode the token
        jwt.verify(token, config.JWTSECRET as string, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: "Invalid Access Token: Expired" });
                }
                return res.status(401).json({ error: "Invalid Access Token" });
            }

            // Token is valid; you can attach decoded data to the request object if needed
            (req as any).user = decoded;

            next();
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export const checkRole = (roles: ('admin' | 'user' | 'super')[]) => (req: Request, res: Response, next: NextFunction): any => {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ error: 'Not Authorized' });
    }

    const decodedToken = jwt.verify(token, config.JWTSECRET as string);

    //@ts-ignore
    if (!decodedToken || !roles.includes(decodedToken.role as ('admin' | 'user' | 'super'))) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    next();
};