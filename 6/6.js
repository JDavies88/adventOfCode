const { getLines } = require("../helper");

const input = getLines("6/input");

const markerNumberCount = 14;

const allElementsUnique = (a) => {
  let result = true;

  a.forEach((e) => {
    const duplicates = a.filter((f) => f === e);
    if (duplicates.length > 1) result = false;
  });

  return result;
};

input.forEach((line, index) => {
  let result;
  const characters = [];

  line.split("").forEach((c, i) => {
    if (
      characters.length < markerNumberCount ||
      !allElementsUnique(characters)
    ) {
      characters.push(c);
      if (characters.length > markerNumberCount) characters.shift();
      result = i + 1;
    }
  });

  console.log(index);
  console.log(result);
  console.log();
});
