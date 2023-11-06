import { spawn } from "child_process";
import path from "path";
const app_path = path.join(__dirname + "/../app");

export const buildReactApp = async () => {
  return new Promise((resolved, reject) => {
    const npm = "C:\\Program Files\\nodejs-20\\npm.cmd";
    const buildProcess = spawn(npm, ["run", "build"], {
      cwd: app_path,
    });

    buildProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    buildProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });
    buildProcess.on("error", (err: any) => {
      console.log(err.message);
    });

    buildProcess.on("close", (code: number) => {
      if (code === 0) {
        console.log("React app build successful");
        return resolved(1);
      } else {
        console.error("React app build failed");
        return reject(0);
      }
    });
  });
};
