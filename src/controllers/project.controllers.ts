import { Request, Response } from "express";
import Project, { IProject } from "../models/project.model";
import { uploadToCloud } from "../helper/cloud";

// get all Project
export const getProject = async (req: Request, res: Response) => {
  try {
    const project: IProject[] = await Project.find({});
    return res
      .status(200)
      .json({ message: "Data retrieved successfully", data: project });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// create a new Project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { projectName, category, githubLink, hostedLink, description } =
      req.body;

    let imageUrl: string | undefined = undefined;
    //Check if Image is Uploaded
    if (req.file) {
      const result = await uploadToCloud(req.file, res);
      if ("url" in result) {
        // If 'url' property exists in result, set imageUrl
        imageUrl = result.url;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }
    const newProject: IProject = new Project({
      projectName,
      category,
      githubLink,
      hostedLink,
      image: imageUrl,
      description,
    });
    const savedProject: IProject = await newProject.save();
    return res
      .status(201)
      .json({ message: "Project added successfully", data: savedProject });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// get a single Project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const projectId: string = req.params.id;
    const project: IProject | null = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    return res.status(200).json({ data: project });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// update a Project by ID
export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId: string = req.params.id;

    const { projectName, category, githubLink, hostedLink, description } =
      req.body;

    let imageUrl: string | undefined = undefined;
    //Check if Image is Uploaded
    if (req.file) {
      const result = await uploadToCloud(req.file, res);
      if ("url" in result) {
        // If 'url' property exists in result, set imageUrl
        imageUrl = result.url;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }

    const updatedProject: IProject | null = await Project.findByIdAndUpdate(
      projectId,
      {
        projectName,
        category,
        githubLink,
        hostedLink,
        image: imageUrl,
        description,
      },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res
      .status(201)
      .json({ message: "Project updated successfully", data: updatedProject });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

//  delete a Project by ID
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId: string = req.params.id;
    const deletedProject: IProject | null = await Project.findByIdAndDelete(
      projectId
    );
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
