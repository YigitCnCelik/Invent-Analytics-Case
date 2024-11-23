import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
