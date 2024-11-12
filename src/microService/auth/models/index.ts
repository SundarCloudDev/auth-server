import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";
import User from "./users";
import Invoice from "./invoice";
dotenv.config();

export const dbConfig = async () => {
  // Database connection configuration
  const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
      host: process.env.DB_HOST || "localhost",
      dialect: (process.env.DB_DIALECT as Dialect) || "mariadb",
      port: Number(process.env.DB_PORT) || 3306,
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    await User(sequelize);
    await Invoice(sequelize);
    await sequelize.sync({ alter: false });
    console.log("Models synchronized successfully.");
  } catch (err: any) {
    console.error("Unable to connect to the database or sync models:", err);
  }
};
