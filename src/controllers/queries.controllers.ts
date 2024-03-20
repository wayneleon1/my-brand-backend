import { Request, Response } from "express";
import Queries, { IQueries } from "../models/queries.model";

// get all Queries
export const getQueries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const queries: IQueries[] = await Queries.find({});
    res.status(200).json({ data: queries });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// create a new Query
export const createQuery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newQuery: IQueries = new Queries(req.body);
    const savedQuery: IQueries = await newQuery.save();
    res
      .status(201)
      .json({ message: "Message Sent successfully", data: savedQuery });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// get a single Query by ID
export const getQueryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const queryId: string = req.params.id;
    const query: IQueries | null = await Queries.findById(queryId);
    if (!query) {
      res.status(404).json({ message: "Message not found" });
      return;
    }
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// update a Query by ID
export const updateQuery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const queryId: string = req.params.id;
    const updatedQuery: IQueries | null = await Queries.findByIdAndUpdate(
      queryId,
      req.body,
      { new: true }
    );
    if (!updatedQuery) {
      res.status(404).json({ message: "Message not found" });
      return;
    }
    res.status(200).json(updatedQuery);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//  delete a Query by ID
export const deleteQuery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const queryId: string = req.params.id;
    const deletedQuery: IQueries | null = await Queries.findByIdAndDelete(
      queryId
    );
    if (!deletedQuery) {
      res.status(404).json({ message: "Message not found" });
      return;
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
