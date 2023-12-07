const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day03/input.txt", "utf-8");
const inputArray = inputText.split("\n");

// each inputArry element looks like:
// ........440...............418..643.....438......740.261......................................727...........................870..............
// and it all of them have 140 chars

const getNumbersInLine = (line) => {
  return line.match(/\d+/g);
};

const isANumber = (string) => {
  return !isNaN(Number(string));
};

class SchemaLine {
  constructor(line, index) {
    this.line = line;
    this.index = index;
  }

  symbolsIndexes() {
    const arr = [];
    this.line.split("").forEach((char, index) => {
      if (!isANumber(char) && char != ".") {
        arr.push(index);
      }
    });
    return arr;
  }

  partNumbersInThisLine(partNumbersArray) {
    return partNumbersArray.filter((numObj) => {
      return numObj["lineIndex"] == this.index;
    });
  }
}

class SchemaNumber {
  constructor(number, lineIndex, startIndex, endIndex) {
    this.number = number;
    this.lineIndex = lineIndex;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  // return all the indexes this number occupies in the line
  allIndexes() {
    const arr = [];
    for (let i = this.startIndex; i <= this.endIndex; i++) {
      arr.push(i);
    }
    return arr;
  }

  // e.g. this number is 48, lives in line with index 10, and starts/ends at index 8/9 of the line
  // the adjancencies would be every index that sorround this 48.
  // e.g. in the line above (index 9) the indexes 7, 8, 9 and 10
  // in the same line (index 10), 1 index before start, 1 after end, i.e. 7, 8, 9 and 10
  // in the line below, (index 11), the indexes 7, 8, 9 and 10
  // so... it is simply 1 index before start and 1 after end, for 1 line above, 1 line below and the same line.
  adjacences() {
    return [this.startIndex - 1, ...this.allIndexes(), this.endIndex + 1];
  }

  relevantSchemaLines() {
    // relevant schemaLines are 1 line above, the line of this number, and 1 line below
    const arr = [];
    const relevantIndexes = [this.lineIndex - 1, this.lineIndex, this.lineIndex + 1];
    relevantIndexes.forEach((i) => {
      arr.push(schemaLinesObjects[i]);
    });
    return arr;
  }

  // check the indexes of symbols in relevant lines
  // and if any of those indexes is an adjacence of this number, it is a "part number" (puzzle term)
  isPartNumber() {
    const schemaLines = this.relevantSchemaLines();
    const adjacentIndexes = this.adjacences();
    let lineObj;
    for (let i = 0; i < schemaLines.length; i++) {
      lineObj = schemaLines[i];
      // for first line (index 0) and last (index 139), the line "above" or line "below" ar undefined
      if (!lineObj) continue;
      if (lineObj.symbolsIndexes().some((index) => adjacentIndexes.includes(index))) {
        return true;
      }
    }

    return false;
  }
}

const schemaNumberObjectsForLine = (line, lineIndex) => {
  const arr = [];
  let ogLine = line;
  const numbersInLine = getNumbersInLine(line);
  numbersInLine.forEach((number) => {
    const startIndex = ogLine.indexOf(number);
    const endIndex = startIndex + (number.length - 1);
    const object = new SchemaNumber(number, lineIndex, startIndex, endIndex);
    // remove this number from line so next number can do indexOf without issues if the number is similar
    number.split("").forEach((char) => {
      ogLine = ogLine.replace(char, ".");
    });
    arr.push(object);
  });
  return arr;
};

const schemaLinesObjects = inputArray.map((line, index) => {
  return new SchemaLine(line, index);
});

const schemaNumberObjects = inputArray
  .map((line, index) => {
    return schemaNumberObjectsForLine(line, index);
  })
  .flat();

const partNumbers = schemaNumberObjects.filter((numObj) => numObj.isPartNumber());

const sumOfAllPartNumber = () => {
  return partNumbers.reduce((sum, numObj) => {
    return sum + Number(numObj["number"]);
  }, 0);
};

console.log(sumOfAllPartNumber()); // 532331 correct ⭐️ for PART 1

/// PART 2

class Asterisk {
  constructor(index, lineIndex) {
    this.index = index;
    this.lineIndex = lineIndex;
  }

  adjacences() {
    return [this.index - 1, this.index, this.index + 1];
  }

  relevantSchemaLines() {
    // relevant schemaLines are 1 line above, the line of this number, and 1 line below
    const arr = [];
    const relevantIndexes = [this.lineIndex - 1, this.lineIndex, this.lineIndex + 1];
    relevantIndexes.forEach((i) => {
      arr.push(schemaLinesObjects[i]);
    });
    return arr;
  }

  adjacentPartNumbers() {
    const adjacentPartNumbers = [];
    const linesObjs = this.relevantSchemaLines();
    for (let i = 0; i < linesObjs.length; i++) {
      const lineObj = linesObjs[i];
      const partNumbersInLine = lineObj.partNumbersInThisLine(partNumbers);
      for (let x = 0; x < partNumbersInLine.length; x++) {
        const partNumber = partNumbersInLine[x];
        if (partNumber.allIndexes().some((index) => this.adjacences().includes(index))) {
          adjacentPartNumbers.push(partNumber);
        }
      }
    }

    return adjacentPartNumbers;
  }

  // according to the puzzle, this Asterisk is a Gear if is adjacent to exactly two part numbers
  // since we have an array of part numbers, we could try to check the part numbers of relevant Lines
  // and see if the start index of the number, up to the end index of the number is adjacent to this Asterisk
  isGear() {
    return this.adjacentPartNumbers().length == 2;
  }

  gearRatio() {
    if (!this.isGear()) return 0;
    const numberPartsArr = this.adjacentPartNumbers();
    return Number(numberPartsArr[0]["number"]) * Number(numberPartsArr[1]["number"]);
  }
}

const createAsterisksObjsForLine = (line, lineIndex) => {
  const arr = [];
  let ogLine = line;
  let astIndex = line.indexOf("*");
  while (astIndex > -1) {
    arr.push(new Asterisk(astIndex, lineIndex));
    ogLine = ogLine.replace("*", ".");
    astIndex = ogLine.indexOf("*");
  }
  return arr;
};

const asteriskObjects = inputArray
  .map((line, lineIndex) => {
    return createAsterisksObjsForLine(line, lineIndex);
  })
  .flat();

const gears = asteriskObjects.filter((astObj) => astObj.isGear());

const sumOfAllGearRatios = gears.reduce((sum, astObj) => {
  return sum + astObj.gearRatio();
}, 0);

console.log(sumOfAllGearRatios); // 82301120 ⭐️ PART 2
