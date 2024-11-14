import express, { Request, Response } from 'express';
import app from './src/app';
import cookieParser from 'cookie-parser';

const server = express();

server.use(express.json());

server.use(cookieParser());

server.use('/',app)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});