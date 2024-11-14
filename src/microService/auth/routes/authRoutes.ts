import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { authenticationController } from "../controller/authController";
import { invoiceController } from "../controller/inoviceController";
import { verifyAdmin, verifyToken } from "../../../middleware/middleware";
dotenv.config();

export const authRouter = Router();

authRouter.get("/", (req: Request, res: Response) => {
  res.send("Sample");
});

authRouter.post("/login", authenticationController.loginController);
authRouter.post("/register", authenticationController.registerController);
// authRouter.post("/refreshToken", authenticationController.updateToken);
authRouter.get("/refreshToken", authenticationController.updateToken);
authRouter.get("/getUsers", verifyToken, authenticationController.getAllUser);
authRouter.get(
  "/getAnalytics",
  verifyToken,
  authenticationController.getAllUser
);

// invoice
authRouter.get("/invoice", verifyAdmin, invoiceController.getAllInvoice);
authRouter.put(
  "/updateInvoice/:id",
  verifyAdmin,
  invoiceController.updateInvoice
);
authRouter.delete(
  "/updateActive/:id",
  verifyAdmin,
  invoiceController.updateActive
);
