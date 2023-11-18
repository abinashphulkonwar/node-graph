import { NextFunction, Request, Response } from "express";
import { Nodedb } from "../db/node";

export const GetnodeList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query as {
    current: string;
    limit: string;
  };

  const current = +query?.current || 0;
  const limit = +query?.limit || 20;

  if (typeof current != "number" || typeof limit != "number")
    throw new Error("query params are not number");

  const nodes = await Nodedb.find({})
    .select({
      _id: 1,
      title: 1,
      description: 1,
      createdAt: 1,
    })
    .skip(current)
    .limit(limit)

    .lean();

  res.json({
    data: nodes,
    isHasMore: nodes.length < 0,
  });
};
