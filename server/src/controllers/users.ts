import User from '../models/User';
import bcrypt from 'bcrypt';
import config from "../utils/config"
import express, { Request, Response } from 'express';
import Tenant from '../models/Tenant';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

const usersRouter = express.Router()


usersRouter.post('/sign-up', async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body


    try {
        // Check if the email is already used
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new tenant
        const tenant = new Tenant({ name });
        await tenant.save();

        // Create a new user as Admin for this tenant
        const user = new User({
            name,
            email,
            hashedPassword,
            role: "admin",
            tenant: tenant._id,
            permissions: [],
        });
        const savedUser = await user.save();

        logger.info('User Created Successfully')

        const userForToken = {
            username: user.username,
            id: user._id,
        }

        const token = jwt.sign(userForToken, config.JWTSECRET as string, { expiresIn: '30s' });
        
        res.status(201).json({
            token, user: {
                name: savedUser.name,
                email: savedUser.email,
                permissions: savedUser.permissions
            }
        })
    } catch (error) {
        res.status(500).json({ error });
    }

})

usersRouter.post('/sign-in', async (request:Request, response:Response): Promise<any> => {
    const { email, password } = request.body

    const user = await User.findOne({ email })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.hashedPassword)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, config.JWTSECRET as string, {expiresIn: 30})

    response
        .status(200)
        .json({
            token, user: {
                avatar: user.avatar,
                userName: user.username,
                authority: [],
                email: user.email,
            }
        })
})


// usersRouter.post('/logout', async (req, res) => {
//     const { token } = req.body; // Assume the client sends the token to blacklist
//     const decoded = jwt.verify(token, config.JWTSECRET);
//     const expiryDate = new Date(); // Convert exp to milliseconds

//     const blacklistedToken = new BlacklistedToken({
//         token,
//         expiryDate,
//     });

//     await blacklistedToken.save();

//     res.status(204).end(); // No content to send back
// });


export default usersRouter;