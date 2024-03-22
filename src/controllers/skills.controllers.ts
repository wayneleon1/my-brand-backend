import { Request, Response } from "express";
import Skills, { ISkills } from "../models/skills.model";
import { uploadToCloud } from "../helper/cloud";

// get all skills
export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills: ISkills[] = await Skills.find({});
    res.status(200).json({ data: skills });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Create a new skill
export const createSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, type } = req.body;
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
    const newSkill: ISkills = new Skills({
      name,
      type,
      image: imageUrl,
    });
    const savedSkill = await newSkill.save();

    res
      .status(201)
      .json({ message: "Skill added successfully", data: savedSkill });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// get a single skill by ID
export const getSkillById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const skillId: string = req.params.id;
    const skill: ISkills | null = await Skills.findById(skillId);
    if (!skill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// update a skill by ID
export const updateSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const skillId: string = req.params.id;
    const updatedSkill: ISkills | null = await Skills.findByIdAndUpdate(
      skillId,
      req.body,
      { new: true }
    );
    if (!updatedSkill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//  delete a skill by ID
export const deleteSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const skillId: string = req.params.id;
    const deletedSkill: ISkills | null = await Skills.findByIdAndDelete(
      skillId
    );
    if (!deletedSkill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
