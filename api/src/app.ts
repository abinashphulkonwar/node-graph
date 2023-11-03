import express from "express";
import { GetNodesRouter } from "./routes/get-node-route";
import { CreateNodeRouter } from "./routes/create-node-route";

const app = express();

app.use(express.json());

app.use(
  "/api/get",

  GetNodesRouter
);
app.use("/api/create", CreateNodeRouter);

app.use(
  "*",
  express.static("../app", {
    maxAge: 10,
    cacheControl: true,
  })
);

export { app };
