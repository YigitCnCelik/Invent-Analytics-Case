import { Sequelize } from "sequelize";
import { initUserModel } from "./user";
import { initBookModel } from "./book";
import { initBorrowModel } from "./borrow";

const sequelize = new Sequelize("library_management", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});

const User = initUserModel(sequelize);
const Book = initBookModel(sequelize);
const Borrow = initBorrowModel(sequelize);

User.hasMany(Borrow, { foreignKey: "userId" });
Book.hasMany(Borrow, { foreignKey: "bookId" });
Borrow.belongsTo(User, { foreignKey: "userId" });
Borrow.belongsTo(Book, { foreignKey: "bookId" });

User.associate({ Book, Borrow });
Book.associate({ User, Borrow });
Borrow.associate({ User, Book });

export { sequelize, User, Book, Borrow };
