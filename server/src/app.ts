import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import config from './utils/config';
import usersRouter from './controllers/users';

const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use('/', usersRouter);

mongoose.connect(config.MONGO_URI as string).then(() => {
    console.log('mongo kissed')
}).catch(() => {
    console.log('mongo not kissed')
})


app.get('/', (req, res) => {
    res.json({message: ''})
})

export default app