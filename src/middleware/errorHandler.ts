import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err) {
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      errors: err.errors || [],
    });
  } else {
    next();
  }
};
