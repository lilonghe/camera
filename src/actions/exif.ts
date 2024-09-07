"use server";
import Docker from "dockerode";
import fs from "fs";
import path from "path";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

let exifToolContainerId: string = "exiftool";

export async function getExifInfo(form: FormData) {
  // save file
  const file = form.get("file") as File;
  const fileName = crypto.randomUUID();
  const filePath = path.resolve(process.env.EXIF_UPLOAD_DIR || "", fileName);
  console.log("Save file to ", filePath);
  fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));

  async function runContainer() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await execCommandInContainer(exifToolContainerId, [
          "exiftool",
          fileName,
        ]);
        if (process.env.AUTO_DELETE_UPLOAD_FILE != "false") {
          fs.unlinkSync(filePath);
        }
        resolve(res);
      } catch (err) {
        console.log("Container error", err);
        reject(err);
      }
    });
  }

  return runContainer();
}

/**
 * 创建容器
 * @param containerId
 */
async function createExifToolContainer(containerId: string) {
  console.log("Create container ...");
  try {
    // 创建一个始终保持运行的容器
    const container = await docker.createContainer({
      Image: "exiftool",
      Cmd: ["tail", "-f", "/dev/null"], // 使用 tail -f /dev/null 命令保持容器运行
      Tty: false,
      HostConfig: {
        Binds: [process.env.EXIF_UPLOAD_DIR + ":/app"],
      },
      name: containerId,
    });

    console.log("Bind path:", process.env.EXIF_UPLOAD_DIR);

    // 启动容器
    await container.start();

    console.log("Container is running. ID:", container.id);

    // 你可以根据需要在这里添加其他操作，例如附加到容器、执行命令等
  } catch (err) {
    console.error("Error:", err);
  }
}

/**
 * 获取指定容器执行命令的结果
 * @param containerId
 * @param command
 * @returns
 */
async function execCommandInContainer(containerId: string, command: string[]) {
  let targetContainer = docker.getContainer(containerId);

  // 检查容器状态
  try {
    console.log("Checking Container status...");
    const status = await targetContainer.inspect();
    if (!status.State.Running) {
      console.log("Container is not running, starting...");
      await targetContainer.start();
    }
  } catch (err: any) {
    console.log("Container error", err);
    console.log("Create container...");
    await createExifToolContainer(containerId);
  }

  // 创建 exec 实例
  const exec = await targetContainer.exec({
    Cmd: command,
    AttachStdout: true,
    AttachStderr: true,
  });

  // 启动 exec 实例并附加到输出流
  const stream = await exec.start({
    Tty: false,
  });

  // 收集输出结果
  let output = "";
  stream.on("data", (data) => {
    output = data.toString();
  });

  return new Promise((resolve, reject) => {
    stream.on("end", () => resolve(output));
    stream.on("error", (err) => reject(err));
  });
}
