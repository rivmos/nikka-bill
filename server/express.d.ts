import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                role: 'admin' | 'user' | 'super';
                [key: string]: any; // Include any additional properties as needed
            } | JwtPayload | string;
        }
    }
}
