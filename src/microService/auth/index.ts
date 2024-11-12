import express from 'express';
import { authRouter } from './routes/authRoutes';
import { dbConfig } from './models';

const authApi = express();
dbConfig()

authApi.use(express.json());
authApi.use('/', authRouter)

export default authApi;