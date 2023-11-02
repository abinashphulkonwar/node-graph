import express from "express";

const route = express.Router();

route.get("/list/", (req, res) => {
  res.send({
    list: [],
  });
});

export { route as GetNodesRouter };
