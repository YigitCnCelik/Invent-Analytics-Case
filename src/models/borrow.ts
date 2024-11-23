import { Model, DataTypes, Sequelize } from "sequelize";

class Borrow extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public score!: number | null;

  public static associate(models: any) {
    Borrow.belongsTo(models.User, { foreignKey: "userId" });
    Borrow.belongsTo(models.Book, { foreignKey: "bookId" });
  }
}

export const initBorrowModel = (sequelize: Sequelize) => {
  Borrow.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Borrow",
      tableName: "Borrows",
      timestamps: false,
    },
  );

  return Borrow;
};

export default Borrow;
