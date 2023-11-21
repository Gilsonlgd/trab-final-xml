const fs = require("fs");

const readFile = async (file_path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file_path, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const readDirectoryFiles = async (directory_path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory_path, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};

module.exports = {
  readFile,
  readDirectoryFiles,
};
