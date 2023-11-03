import express from "express";
import { CreateNode } from "../controllers/create-node-controller";
import { CreateNodeRouterValidator } from "../validator/create-node-route";

const route = express.Router();

route.post("/node", CreateNodeRouterValidator, CreateNode);

export { route as CreateNodeRouter };
