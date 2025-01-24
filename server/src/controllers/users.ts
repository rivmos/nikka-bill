import User from '../models/User';
import bcrypt from 'bcrypt';
import config from "../utils/config"
import express, { Request, Response } from 'express';
import Tenant from '../models/Tenant';
import BlacklistedToken from '../models/BlacklistedToken';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

const router = express.Router()

router.post('/sign-up', async (req: Request, res: Response): Promise<any> => {
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
            username: user.name,
            id: user._id,
        }

        const token = jwt.sign(userForToken, config.JWTSECRET as string, { expiresIn: '1h' });
        
        res.status(201).json({
            token, user: {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email,
                permissions: savedUser.permissions,
                tenant: user.tenant,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ error });
    }

})

router.post('/sign-up/user', async (req: Request, res: Response): Promise<any> => {
    const { name, email, password, tenant } = req.body


    try {
        // Check if the email is already used
        const existingUser = await User.findOne({ email, tenant });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user as Admin for this tenant
        const user = new User({
            name,
            email,
            hashedPassword,
            role: "user",
            tenant: tenant,
            permissions: [],
        });
        const savedUser = await user.save();

        logger.info('User Created Successfully')

        const userForToken = {
            id: user._id,
            username: user.name,
            role: user.role
        }

        const token = jwt.sign(userForToken, config.JWTSECRET as string, { expiresIn: '1h' });
        
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error });
    }

})


router.post('/sign-in', async (request:Request, response:Response): Promise<any> => {
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
        id: user._id,
        username: user.name,
        role: user.role
    }

    const token = jwt.sign(userForToken, config.JWTSECRET as string, {expiresIn: '1h'})

    response
        .status(200)
        .json({
            token, user: {
                id: user.id,
                name: user.name,
                email: user.email,
                permissions: user.permissions,
                tenant: user.tenant,
                role: user.role
            }
        })
})


router.post('/sign-out', async (req, res) => {
    const { token } = req.body; // Assume the client sends the token to blacklist
    const expiryDate = new Date(); // Convert exp to milliseconds

    const blacklistedToken = new BlacklistedToken({
        token,
        expiryDate,
    });

    await blacklistedToken.save();

    res.status(204).end(); // No content to send back
});


// Fetch users by tenant
router.get("/users/tenant/:tenantId", async (req: Request, res: Response) => {
    try {
      const users = await User.find({ tenant: req.params.tenantId });
      res.json(users);
    } catch (error) {
       if (error instanceof Error) {
              res.status(400).json({ message: error.message });
          } else {
              res.status(400).json({ message: "An unknown error occurred" });
          }
    }
  });

export default router;