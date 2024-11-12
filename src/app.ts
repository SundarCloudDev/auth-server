import express, { Request, Response } from "express";

import authApi from "./microService/auth";
import cors from "cors";
const app = express();
app.use(cors());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/auth", authApi);

export default app;
