import { Request, Response } from "express";
import { User, Book, Borrow } from "../models";
import { validationResult } from "express-validator";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;


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
    ?.filter((book: any) => book.Borrow?.isReturned) // İade edilmiş kitaplar
    .map((book: any) => ({
      name: book.name,
      userScore: book.Borrow?.score || null, // Kullanıcının verdiği puan
    }));

  const presentBooks = user.books
    ?.filter((book: any) => !book.Borrow?.isReturned) // Halen ödünç alınmış kitaplar
    .map((book: any) => ({
      name: book.name,
    }));

  // Yanıtı oluştur
  const response = {
    id: user.id,
    name: user.name,
    books: {
      past: pastBooks || [],
      present: presentBooks || [],
    },
  };

  res.json(response);
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
  const user = await User.findByPk(id);
  const book = await Book.findByPk(bookId);

  if (!user || !book) {
    return res.status(404).send("User or Book not found");
  }

  const existingBorrow = await Borrow.findOne({
    where: { bookId },
  });

  if (existingBorrow) {
    return res.status(400).send("This book is already borrowed by the user.");
  }

  await Borrow.create({ userId: id, bookId });
  res.status(204).send();
};

export const returnBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, bookId } = req.params;
  const { score } = req.body;

  // Borrow kaydını bulun
  const borrow = await Borrow.findOne({ where: { userId: id, bookId } });

  if (!borrow) {
    return res.status(404).send("Borrow record not found");
  }

  // Kitabın iade edildiğini ve puan verildiğini işaretle
  borrow.isReturned = true;
  borrow.score = score;
  await borrow.save();

  // Kitabın ortalama puanını güncelle
  const book = await Book.findByPk(bookId);
  if (!book) {
    return res.status(404).send("Book not found");
  }

  const currentScore = book.score || 0;
  const scoreCount = book.scoreCount || 0;
  const newScoreCount = scoreCount + 1;
  const newScore = (currentScore * scoreCount + score) / newScoreCount;

  book.score = newScore; // Yeni ortalama puanı kaydet
  book.scoreCount = newScoreCount; // Toplam puan sayısını güncelle
  await book.save();

  res.status(204).send();
};

