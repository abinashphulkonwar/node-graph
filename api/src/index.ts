import { app } from "./app";
import mongoose from "mongoose";
import path from "path";

//if (process.env.NODE_ENV != "production") {
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "../../app"));
liveReloadServer.server.on("connection", () => {
  console.log("tcp connected");
});
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload({ port: 35729 }));

app.listen(3000, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/node-graph");

  console.log("connected");
});
