import express, { Request, Response } from 'express';
import authApi from './src/microService/auth/index';
import app from './src/app';

const server = express();

server.use(express.json());

server.use('/',app)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});