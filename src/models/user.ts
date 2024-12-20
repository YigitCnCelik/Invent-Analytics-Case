import { Model, DataTypes, Sequelize } from "sequelize";
import Book from "./book";

class User extends Model {
  public id!: number;
  public name!: string;
  public books?: Book[];

  public static associate(models: any) {
    User.belongsToMany(models.Book, {
      through: models.Borrow,
      as: "books",
      foreignKey: "userId",
    });
  }
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: false,
    },
  );

  return User;
};

export default User;
