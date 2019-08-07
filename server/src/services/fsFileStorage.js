import fs from "fs";
import path from "path";

class FsFileStorage {
  async getFileAsync(container, name, writeStream) {
    let filePath = this.makeFilePath(container, name);
    let readStream = fs.createReadStream(filePath);
    return new Promise((resolve, reject) => {
      readStream.pipe(writeStream);
      readStream.on("end", function() {
        resolve(filePath);
      });
    });
  }

  async saveFileAsync(container, name, dataStream) {
    let filePath = this.makeFilePath(container, name);
    let writeStream = fs.createWriteStream(filePath);
    return new Promise((resolve, reject) => {
      dataStream.pipe(writeStream);
      dataStream.on("end", function() {
        resolve(filePath);
      });
    });
  }

  makeFilePath(container, name) {
    let dir = path.join(process.cwd(), "assets", container);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    return path.join(dir, name);
  }

  async findFileByPrefix(container, prefix) {
    let dir = path.join(process.cwd(), "assets", container);
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (files) var res = files.find(x => x.startsWith(prefix));
        if (!files || !res) reject("File not found");
        else resolve(path.join(dir, res));
      });
    });
  }
}

export default FsFileStorage;
