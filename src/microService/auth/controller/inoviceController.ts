import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { Invoice } from "../models/invoice";
import { where } from "sequelize";
dotenv.config();

export module invoiceController {
  export const getAllInvoice = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const invoices = await Invoice.findAll({
        where: {
          is_active: true,
        },
      });

      return res.status(200).json({
        message: "Invoices fetched successfully",
        data: invoices,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({
        message: "Something went wrong while fetching invoices",
        error: err.message,
      });
    }
  };

  export const updateInvoice = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { id } = req.params;
    console.log(req.params);

    const { qty, name, totalAmount } = req.body;

    try {
      const updated = await Invoice.update(
        { qty, name, totalAmount },
        { where: { id } }
      );

      return res.status(200).json({
        message: `Invoice with ID ${id} updated successfully.`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Something went wrong while updating the invoice.",
        error: err.message,
      });
    }
  };

  export const updateActive = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { id } = req.params;
    console.log(req.params);

    try {
      const updated = await Invoice.update(
        { is_active: false },
        { where: { id } }
      );

      return res.status(200).json({
        message: `Invoice with ID ${id} updated successfully.`,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({
        message: "Something went wrong while updating the invoice.",
        error: err.message,
      });
    }
  };
}
