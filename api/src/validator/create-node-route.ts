import { NextFunction, Request, Response } from "express";
import { Nodedb } from "../db/node";
import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  userId: {
    type: "string",
  },
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  type: {
    type: "enum",
    values: ["node", "group", "unit", "collection"],
  },
  data: {
    $$type: "object",

    time: {
      type: "date",
      convert: true,
    },
    blocks: {
      type: "array",
      items: "object",
    },
    version: {
      type: "string",
    },
  },
  connected_to: {
    type: "array",
    items: "string",
  },

  connected_from: {
    type: "array",
    items: "string",
  },
  group: {
    type: "array",
    items: "string",
  },
  position: {
    $$type: "object",

    x: {
      type: "number",
      default: 0,
    },
    y: {
      type: "number",
      default: 0,
    },
  },
};

const check = v.compile(schema);

export const CreateNodeRouterValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = check(req.body);
  if (status == true) {
    next();
    return;
  }
  console.log(status);
  res.status(422).send(status);
};
