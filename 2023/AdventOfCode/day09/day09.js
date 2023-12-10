const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day09/input.txt", "utf-8");
let inputArray = inputText.split("\n");

// console.log(inputArray)
const lines = inputArray.map((el) => el.split(" ").filter((el) => el != "").map((el) => Number(el)))

const sequenceOfDifference = (line) => {
  const arr = []
  for(let i = 0; i+1<line.length ;i++) {
    arr.push(line[i+1] - line[i])
  }
  return arr;
}

// console.log(sequenceOfDifference(lines[0]))

const createAllSequencesForLine = (line) => {
  const stack = []
  stack.push(line)
  while(!stack[stack.length-1].every((el) => el == 0)) {
    stack.push(sequenceOfDifference(stack[stack.length-1]))
  }
  return stack;
}

// const stack = createAllSequencesForLine(lines[2])
// console.log(stack)

// having
// 0   3   6   9  12  15
//   3   3   3   3   3
//     0   0   0   0
// start adding a 0 to the bottom level
// and then each level add to ther right the result of last digit of line + last digit of bottom line
// resulting in
// 0   3   6   9  12  15  18
//   3   3   3   3   3   3
//     0   0   0   0   0
const extrapolateFromStack = (stack) => {
  for(let i = stack.length-1 ; i >= 0 ; i--){
    // last line of stack should be all 0
    if(i === stack.length-1) {
      stack[i].push(0)
    } else {
      stack[i].push(stack[i][stack[i].length-1] + stack[i+1][stack[i+1].length-1])
    }
  }
  return stack[0][stack[0].length-1]
}

// having
// 0   3   6   9  12  15
//   3   3   3   3   3
//     0   0   0   0
// we should extrapolate but this time "to the left" resulting in
// -3   0   3   6   9  12  15
//   3  3   3   3   3   3
//      0   0   0   0   0
const extrapolateBackFromStack = (stack) => {
  for(let i = stack.length-1 ; i >= 0 ; i--){
    // last line of stack should be all 0
    if(i === stack.length-1) {
      stack[i].unshift(0)
    } else {
      stack[i].unshift(stack[i][0] - stack[i+1][0])
    }
  }
  return stack[0][0]
}

// console.log(extrapolateFromStack(stack))
const allStacks = lines.map((line) => createAllSequencesForLine(line))
// const result = [...allStacks].reduce((sum, stack) => sum + extrapolateFromStack(stack), 0)

// console.log(result) // correct 1681758908 for PART 1 ⭐️

const resultPart2 = allStacks.reduce((sum, stack) => sum + extrapolateBackFromStack(stack), 0)
console.log(resultPart2) // correct 803 for PART 2 ⭐️