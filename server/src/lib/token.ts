
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateAccessToken = (user: User) => {
  return jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: "420s" });
};