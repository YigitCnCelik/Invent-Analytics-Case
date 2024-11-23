import { Request, Response } from "express";
import { User, Book, Borrow } from "../models";
import { validationResult } from "express-validator";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Book,
          as: "books",
          through: { attributes: ["isReturned", "score"] },
        },
      ],
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const pastBooks = user.books
      ?.filter((book: any) => book.Borrow?.isReturned)
      .map((book: any) => ({
        name: book.name,
        userScore: book.Borrow?.score || null,
      }));

    const presentBooks = user.books
      ?.filter((book: any) => !book.Borrow?.isReturned)
      .map((book: any) => ({
        name: book.name,
      }));

    res.json({
      id: user.id,
      name: user.name,
      books: {
        past: pastBooks || [],
        present: presentBooks || [],
      },
    });
  } catch (error) {
    res.status(500).send("An error occurred while fetching the user.");
  }
};



export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  const newUser = await User.create({ name });
  res.status(201).json(newUser);
};

export const borrowBook = async (req: Request, res: Response) => {
  const { id, bookId } = req.params as { id: string; bookId: string };

  try {
    const user = await User.findByPk(id);
    const book = await Book.findByPk(bookId);

    if (!user || !book) {
      return res.status(404).send("User or Book not found.");
    }

    const existingBorrow = await Borrow.findOne({
      where: { bookId, isReturned: false },
    });

    if (existingBorrow) {
      return res.status(400).send("This book is already borrowed.");
    }

    await Borrow.create({ userId: id, bookId, isReturned: false });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("An error occurred while borrowing the book.");
  }
};



export const returnBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, bookId } = req.params;
  const { score } = req.body;

  try {
    const borrow = await Borrow.findOne({
      where: { userId: id, bookId, isReturned: false },
    });

    if (!borrow) {
      return res.status(404).send("Borrow record not found or already returned.");
    }

    borrow.isReturned = true;
    borrow.score = score;
    await borrow.save();

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).send("Book not found.");
    }

    const currentScore = book.score || 0;
    const scoreCount = book.scoreCount || 0;
    const newScoreCount = scoreCount + 1;
    const newScore = (currentScore * scoreCount + score) / newScoreCount;

    book.score = newScore;
    book.scoreCount = newScoreCount;
    await book.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).send("An error occurred while returning the book.");
  }
};


