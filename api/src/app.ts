import express from "express";
import { GetNodesRouter } from "./routes/get-node-route";
import { CreateNodeRouter } from "./routes/create-node-route";
import path from "path";

const app = express();

//if (process.env.NODE_ENV != "production") {
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
const static_path = path.join(__dirname, "../../app");
console.log(static_path);
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(static_path);

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload({ port: 35729 }));

app.use(express.json());

app.use(
  "/api/get",

  GetNodesRouter
);
app.use("/api/create", CreateNodeRouter);

app.use("/app", express.static(static_path));

export { app };
