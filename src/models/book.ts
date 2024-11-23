import { Model, DataTypes, Sequelize } from "sequelize";

class Book extends Model {
  public id!: number;
  public name!: string;
  public score!: number | null;
  public scoreCount!: number;

  public static associate(models: any) {
    Book.belongsToMany(models.User, {
      through: models.Borrow,
      as: "borrowers",
      foreignKey: "bookId",
    });
  }
}

export const initBookModel = (sequelize: Sequelize) => {
  Book.init(
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
      score: {
        type: DataTypes.FLOAT,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "Books",
      timestamps: false,
    },
  );

  return Book;
};

export default Book;
