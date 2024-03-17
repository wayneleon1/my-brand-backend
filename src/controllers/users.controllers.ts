import { Request, Response } from "express";
import User, { IUser } from "../models/users.model";

// get all User
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser[] = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// create a new User
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser: IUser = new User(req.body);
    const savedUser: IUser = await newUser.save();
    res.status(201).json(savedUser);
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
    const user: IUser | null = await User.findById(userId);
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
