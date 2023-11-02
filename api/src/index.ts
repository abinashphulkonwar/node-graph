import { app } from "./app";
import mongoose from "mongoose";
app.listen(3000, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/node-graph");

  console.log("connected");
});
