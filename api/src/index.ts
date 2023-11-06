import { buildReactApp } from "./build";
import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  const res = await buildReactApp();
  return app.listen(3000, async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/node-graph");

    console.log("connected");
  });
};

start();
