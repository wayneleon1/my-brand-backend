import { Request, Response } from "express";
import Queries, { IQueries } from "../models/queries.model";

// get all Queries
export const getQueries = async (req: Request, res: Response) => {
  try {
    const queries: IQueries[] = await Queries.find({});
    return res
      .status(200)
      .json({ message: "Data retrieved successfully", data: queries });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Create a new Query
export const createQuery = async (req: Request, res: Response) => {
  try {
    const newQuery: IQueries = new Queries(req.body);
    const savedQuery: IQueries = await newQuery.save();
    return res
      .status(201)
      .json({ message: "Message Sent successfully", data: savedQuery });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Get a single Query by ID
export const getQueryById = async (req: Request, res: Response) => {
  try {
    const queryId: string = req.params.id;
    const query: IQueries | null = await Queries.findById(queryId);
    if (!query) {
      return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json({ data: query });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

//  Delete a Query by ID
export const deleteQuery = async (req: Request, res: Response) => {
  try {
    const queryId: string = req.params.id;
    const deletedQuery: IQueries | null = await Queries.findByIdAndDelete(
      queryId
    );
    if (!deletedQuery) {
      return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
