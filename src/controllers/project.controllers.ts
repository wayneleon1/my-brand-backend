import { Request, Response } from "express";
import Project, { IProject } from "../models/project.model";

// get all Project
export const getProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project: IProject[] = await Project.find({});
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// create a new Project
export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProject: IProject = new Project(req.body);
    const savedProject: IProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// get a single Project by ID
export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectId: string = req.params.id;
    const project: IProject | null = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// update a Project by ID
export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectId: string = req.params.id;
    const updatedProject: IProject | null = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//  delete a Project by ID
export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectId: string = req.params.id;
    const deletedProject: IProject | null = await Project.findByIdAndDelete(
      projectId
    );
    if (!deletedProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
