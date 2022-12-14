const { getLines } = require("../helper");
const { v4: uuidv4 } = require("uuid");

const lines = getLines("7/input");

// Replace all directory names with {dir}-uuid
lines.forEach((l, i) => {
  if (l.startsWith("dir")) {
    const dir = l.split(" ")[1];
    const id = `${dir}-${uuidv4()}`;
    lines[i] = `dir ${id}`;
    lines[lines.indexOf(`$ cd ${dir}`, i)] = `$ cd ${id}`;
  }
});

const files = [];
const path = [];
const directories = [];

lines.forEach((line) => {
  // Create list of directories
  if (line.startsWith("dir ")) {
    directories.push(line.split(" ")[1]);
  }

  // Add files to files array
  if (line === "$ cd ..") {
    path.pop();
  } else if (line.startsWith("$ cd ") && line !== "$ cd /") {
    const d = line.split(" ")[2];
    path.push(d);
  } else if (!line.startsWith("dir") && !line.startsWith("$")) {
    const fileSize = parseInt(line.split(" ")[0]);
    files.push({
      path: `/${path.join("/")}`,
      size: fileSize,
    });
  }
});

const directorySizes = [];

// combine files with matching paths
files.forEach((f) => {
  const i = directorySizes.findIndex((d) => d.path === f.path);
  if (i === -1) {
    directorySizes.push(f);
  } else {
    directorySizes[i].size += f.size;
  }
});

// Include child directories in directory sizes
const totals = [
  {
    path: "/",
    size: directorySizes.map((d) => d.size).reduce((a, b) => a + b),
  },
  ...directories.map((d) => {
    return {
      path: d.split("-")[0],
      size: directorySizes
        .filter((ds) => ds.path.includes(d))
        .map((ds) => ds.size)
        .reduce((a, b) => a + b),
    };
  }),
];

// Part 1
const memoryLimit = 100000;

console.log(
  totals
    .filter((t) => t.size <= memoryLimit)
    .map((t) => t.size)
    .reduce((a, b) => a + b)
);

// Part 2
const totalSpace = 70000000;
const spaceNeeded = 30000000;

const freeSpace = totalSpace - totals[0].size;
const spaceToDelete = spaceNeeded - freeSpace;

const smallestValidDirectory = totals
  .map((t) => t.size)
  .sort((a, b) => a - b)
  .find((t) => t >= spaceToDelete);
console.log(smallestValidDirectory);
