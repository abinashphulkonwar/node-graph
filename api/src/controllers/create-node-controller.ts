import { NextFunction, Request, Response } from "express";
import { Nodedb } from "../db/node";

export const CreateNode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const node = Nodedb.build(req.body);
  await node.save();
  res.json(node);
};
