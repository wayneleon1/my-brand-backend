import { Request, Response } from "express";
import User, { IUser } from "../models/users.model";
import { uploadToCloud } from "../helper/cloud";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Registration
export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ message: "All fields are mandatory!" });
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    return res.status(400).json({ message: "User already registered!" });
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Upload Image
  let imageUrl: string | undefined = undefined;
  if (req.file) {
    const result = await uploadToCloud(req.file, res);
    if ("url" in result) {
      // If 'url' property exists in result, set imageUrl
      imageUrl = result.url;
    } else {
      throw new Error("Failed to upload image to Cloudinary");
    }
  }
  const newUser: IUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    image: imageUrl,
    role,
  });

  try {
    const user = await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      data: {
        _id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "User data was not valid" });
  }
};

// get all User
export const getUsers = async (req: Request, res: Response) => {
  try {
    const user: IUser[] = await User.find({}, { password: 0 });
    return res
      .status(200)
      .json({ message: "Data retrieved successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// get a single User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const user: IUser | null = await User.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// update a User by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(201)
      .json({ message: "User updated successfully", data: updatedUser });
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
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are mandatory!" });
    }

    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .send({ message: "Email or password is not valid" });
    }

    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET || ""
      // { expiresIn: "15m" }
    );
    return res
      .status(200)
      .json({ message: "User was logged in successfully", accessToken });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
