const { readFileSync } = require("fs");

const getLines = (path) => readFileSync(path, "utf-8").split("\n");

module.exports = {
  getLines,
};
