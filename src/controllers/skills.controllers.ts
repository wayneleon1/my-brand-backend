import { Request, Response, NextFunction } from "express";

// Get all Skills
export const getAllSkills = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send("Fetching All Skills");
};

// Get single Skill by Id
export const getSkill = (req: Request, res: Response, next: NextFunction) => {
  return res.send("Get single Skill by Id");
};

//  Create a new Skill
export const createSkill = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send("Create a new skill");
};

// Update Skill
export const updateSkill = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send("Update Skill");
};

// Delete skill
export const deleteSkill = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send("Delete Skill");
};
