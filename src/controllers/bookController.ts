import { Request, Response } from "express";
import { Book, Borrow } from "../models";
import { validationResult } from "express-validator";

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll({
    attributes: { exclude: ['score'] },
  });
  res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const book = await Book.findByPk(id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  const bookJson = book.toJSON();
  delete bookJson.scoreCount;

  res.json(bookJson);
};

export const createBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  const newBook = await Book.create({ name });
  res.status(201).json(newBook);
};
