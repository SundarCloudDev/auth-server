import express, { Request, Response } from "express";

import authApi from "./microService/auth";
import cors from "cors";
const app = express();
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,  
};

app.use(cors(corsOptions));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/auth", authApi);

export default app;
