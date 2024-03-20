import { Request, Response } from "express";
import User, { IUser } from "../models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Registration
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ message: "User already registered!" });
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: IUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  try {
    const user = await newUser.save();
    res.status(201).json({ _id: user.id, email: user.email, role: user.role });
  } catch (error) {
    res.status(400).json({ message: "User data was not valid" });
  }
};

// get all User
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser[] = await User.find({}, { password: 0 });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// get a single User by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: string = req.params.id;
    const user: IUser | null = await User.findById(userId, { password: 0 });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// update a User by ID
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: string = req.params.id;
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//  delete a User by ID
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: string = req.params.id;
    const deletedUser: IUser | null = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error("Email or password is not valid");
    }

    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
