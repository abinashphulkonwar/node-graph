import express from "express";
import { GetNodesRouter } from "./routes/get-node-route";

const app = express();

app.use(
  "/api/get",

  GetNodesRouter
);
app.use("/api/get/list", (req, res) => {
  res.status(404).send("not found");
});
app.use(
  "*",
  express.static("../app", {
    maxAge: 10,
    cacheControl: true,
  })
);

export { app };
