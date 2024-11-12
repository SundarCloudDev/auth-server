import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface InvoiceAttributes {
  id: number;
  name: string;
  qty: number;
  totalAmount: string;
  is_active: boolean;
}

interface InvoiceCreationAttributes extends Optional<InvoiceAttributes, "id"> {}

export class Invoice
  extends Model<InvoiceAttributes, InvoiceCreationAttributes>
  implements InvoiceAttributes
{
  public id!: number;
  public name!: string;
  public qty!: number;
  public totalAmount!: string;
  public is_active!: boolean;
}

export default (sequelize: Sequelize) => {
  Invoice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Invoice",
      tableName: "Invoices",
      timestamps: true,
    }
  );

  return Invoice;
};
