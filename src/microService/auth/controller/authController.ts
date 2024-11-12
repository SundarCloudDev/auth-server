import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users";
import dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { Op } from "sequelize";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "Test@123";
const JWT_EXPIRATION = "24h";

export module authenticationController {
  export const loginController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    console.log(req.body);

    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required." });
      }

      const user = await User.findOne({
        where: { email },
      });
      console.log(user);

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRATION,
          algorithm: "HS256",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        role: user.role,
        token,
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const registerController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
      if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({
          message:
            "First name, last name, email, password, and role are required.",
        });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      return res.status(200).json({
        message: "Registration successful",
        token,
      });
    } catch (error) {
      console.error("Registration Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getAllUser = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const users = await User.findAll({
        where: {
          role: {
            [Op.ne]: "admin",
          },
        },
        raw: true,
      });
      res.status(200).json({ data: users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  };
}
