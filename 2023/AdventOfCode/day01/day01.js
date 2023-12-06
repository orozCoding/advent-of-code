const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day01/input.txt", "utf-8");
const input = inputText.split("\n");

// Code can be way shorter. Leaving it as readable as possible for anyone peeking :)

const isANumber = (string) => {
  return !isNaN(Number(string));
};

const firstDigit = (string) => {
  const arr = string.split("");
  for (let i = 0; i < arr.length; i++) {
    if (isANumber(arr[i])) {
      return arr[i];
    }
  }
  return false;
};

const lastDigit = (string) => {
  const arr = string.split("");
  for (let i = arr.length - 1; i > -1; i--) {
    if (isANumber(arr[i])) {
      return arr[i];
    }
  }
  return false;
};

// gets a sting like "asd1asdkasd789" and return the first and last digits combined. e.g. "19"
const calibrationValue = (string) => {
  const forceString = String(string);
  const first = firstDigit(forceString);
  if (!first) return 0;
  const last = lastDigit(forceString);

  return Number(first + last);
};

const allCalibrationValues = (inputArray) => {
  let values = [];
  inputArray.forEach((line) => {
    values.push(calibrationValue(line));
  });
  return values;
};

const sumAllValues = (valuesArr) => {
  let sum = 0;
  for (let i = 0; i < valuesArr.length; i++) {
    sum += valuesArr[i];
  }

  return sum;
};

const allCalibrationValuesSummed = sumAllValues(allCalibrationValues(input));

console.log(allCalibrationValuesSummed); // 56506 ✅ // correct for part 1

// part two

const WordsToNumbers = {
  // twone: "2ne",
  // eightwo: "8wo",
  // eighthree: "8hree",
  // nineight: "9ight",
  oneight: 18,
  twone: 21,
  threeight: 38,
  fiveight: 58,
  sevenine: 79,
  eightwo: 82,
  eighthree: 83,
  nineight: 98,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const wordNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
// const dangerouslyColidingNumbers = ["twone", "eightwo", "eighthree", "nineight"];
// using the below for a 2nd approach
const colidingNumbers = ["oneight", "twone", "threeight", "fiveight", "sevenine", "eightwo", "eighthree", "nineight"];
const allPossibleWords = [...colidingNumbers, ...wordNumbers];

const translateAllNumbersFromString = (string) => {
  let finalString = string;
  allPossibleWords.forEach((numberString) => {
    finalString = finalString.replaceAll(numberString, WordsToNumbers[numberString]);
  });
  return finalString;
};

const allInputsTranslated = (input) => {
  let newArr = [];
  input.forEach((line) => {
    const result = translateAllNumbersFromString(String(line));
    newArr.push(result);
  });
  return newArr;
};

const translatedInputs = allInputsTranslated(input);

const allCalibrationValuesSummedAfterTranslation = sumAllValues(allCalibrationValues(translatedInputs));

console.log(allCalibrationValuesSummedAfterTranslation); // 56017 ⭐️ Part 2

// Commenting since not relevant for function
// With the code I checked which numebers colided so I knew which "mixed" numebers to add to the mapping

// let firstNumber;
// let secondNumber;
// let firstNumberLastLetter;
// let secondNumberFirstLetter;

// for (let i = 0; i < wordNumbers.length; i++) {
//   for (let x = 0; x < wordNumbers.length; x++) {
//     if (i == x) continue;
//     firstNumber = wordNumbers[i];
//     secondNumber = wordNumbers[x];
//     firstNumberLastLetter = firstNumber[firstNumber.length - 1];
//     secondNumberFirstLetter = secondNumber[0];

//     if (firstNumberLastLetter == secondNumberFirstLetter) {
//       // the code below was thinking that "oneight" should be "1ight" but now we'll try translate it to "18"
//       // these numbers colide, but since our maping array is ascending i.e. from one to nine
//       // the issue could hapen if the greater number between the 2 coliding comes in first place
//       // e.g. two and one, because the translation of one into 1 will happen before the translation of two (because how our maping object and array)
//       // so a string like "twone" will be "tw1" instead of "2ne".
//       // console.log(`${firstNumber} and ${secondNumber} colide.`);
//       // if (WordsToNumbers[firstNumber] > WordsToNumbers[secondNumber]) {
//       //   console.log("... and is dangerous");
//       //   console.log(
//       //     "so better add the string " +
//       //       (firstNumber + secondNumber.replace(secondNumberFirstLetter, "")) +
//       //       " as " +
//       //       WordsToNumbers[firstNumber] +
//       //       " in the words to numbers map object"
//       //   );
//       // }

//       // new approach, translating  "oneight" into "18" and not "1ight"
//       console.log(
//         `${firstNumber} and ${secondNumber} colide, forming ` +
//           (firstNumber + secondNumber.replace(secondNumberFirstLetter, ""))
//       );
//       console.log(
//         "Which maybe the puzzle wants to read as " +
//           Number(String(WordsToNumbers[firstNumber]) + WordsToNumbers[secondNumber])
//       );
//     }
//   }
// }

// ********* DEBBUGGING

// for (let i = 0; i < translatedInputs.length; i++) {
//   console.log("-----------");
//   console.log(translatedInputs[i] + " is being used, as a translation of ");
//   console.log(input[i]);

//   console.log("Calibration value was " + calibrationValue(translatedInputs[i]));
// }

// With the debuging above we found cases where "oneighttq" were translated to "1ighttq"
// It is possible that the puzzle wants us to translate it to "18"
// EDIT: We were right. They wanted it like mentioned here ☝🏻
