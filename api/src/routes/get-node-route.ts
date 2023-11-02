import express from "express";
import { GetnodeList } from "../controllers/get-node-controllter";

const route = express.Router();

route.get("/list/", GetnodeList);

export { route as GetNodesRouter };
