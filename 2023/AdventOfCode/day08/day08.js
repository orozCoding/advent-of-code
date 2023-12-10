const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day08/input.txt", "utf-8");
let inputArray = inputText.split("\n").filter((el) => el != "");

// console.log(inputArray)

const instructions = inputArray.shift().split("")
const map = inputArray

// console.log(instructions)
// console.log(inputArray)

const mapObject = {}

map.forEach((el) => {
  const cleanMap = el.replace(/[^\sA-Z0-9]/g, "").split(" ").filter((el) => el != "")
  mapObject[cleanMap[0]] = {L: cleanMap[1], R: cleanMap[2]}
})

// console.log(mapObject)

// let steps = 0
// let currentSpot = 'AAA'
// let currentInstructionIndex = 0
// while(currentSpot != 'ZZZ') {
//   steps++
//   if(currentInstructionIndex > instructions.length - 1) {
//     // if we have LRL and current index is 3, then LRL[index] will be undefined. Set it back to 0 so it starts again
//     currentInstructionIndex = 0
//   }
//   currentSpot = mapObject[currentSpot][instructions[currentInstructionIndex]]
//   currentInstructionIndex++
// }

// 6 correct for example input 6 PART 1 
// 12643 correct for real input PART 1 ⭐️
// console.log(steps) 

// PART 2
// all keys that end with A
const startingKeys = Object.keys(mapObject).filter((el) => el[2] == 'A')

const stepsToZ = (startingSpot, startingInstructionIndex = 0) => {
  let steps = 0
  let currentSpot = startingSpot
  let currentInstructionIndex = startingInstructionIndex
  while(currentSpot[2] != 'Z' || steps == 0) {
    steps++
    if(currentInstructionIndex > instructions.length - 1) {
      // if we have LRL and current index is 3, then LRL[index] will be undefined. Set it back to 0 so it starts again
      currentInstructionIndex = 0
    }
    currentSpot = mapObject[currentSpot][instructions[currentInstructionIndex]]
    currentInstructionIndex++
  }
  // console.log(currentSpot)
  return steps
}

// console.log(stepsToZ(startingKeys[0]))

const endForSteps = (startingSpot, steps, startingInstructionIndex = 0) => {
  let i = 0;
  let currentSpot = startingSpot
  let currentInstructionIndex = startingInstructionIndex
  while(i < steps) {
    if(currentInstructionIndex > instructions.length - 1) {
      // if we have LRL and current index is 3, then LRL[index] will be undefined. Set it back to 0 so it starts again
      currentInstructionIndex = 0
    }
    currentSpot = mapObject[currentSpot][instructions[currentInstructionIndex]]
    i++
    currentInstructionIndex++
  }
  return [currentSpot, currentInstructionIndex]
}

// console.log(stepsToZ('22C', 2, 1))
// console.log(endForSteps('22A', 2))

const endsInZSpot = (startingSpot, steps, startingInstructionIndex = 0) => {
  return endForSteps(startingSpot, steps, startingInstructionIndex)[2] == 'Z'
}

const allNodesEndInZSpot = (arrayOfStartingSpots, steps, startingInstructionIndex = 0) => {
  let yes = true
  for(let i = 0; i<arrayOfStartingSpots.length; i++){
    if(endsInZSpot(arrayOfStartingSpots[i], steps)) continue
    return false
  }
  return yes
}

// let steps = 0
// while(!allNodesEndInZSpot(startingKeys, steps)){
//   steps++
// }
// correct 6 for example input in PART 2 but will take forever with real input
// console.log(steps)

// we should save the saved steps tested, and try check again in a new fiinding

const theyAllEndedInZSpot = (arrayOfEndings) => {
  return arrayOfEndings.every((el) => el[0][2] == 'Z')
}

// const stepsTried = {}
// let's find the stepsToZ of first element
// let stepsUsed = 0
// let currentSnapshot = startingKeys.map((el) => [el, 0])
// let stepsForZ = stepsToZ(currentSnapshot[0][0], currentSnapshot[0][1]) // 2
// // let's capture the state of all startingKeys at this point
// currentSnapshot = currentSnapshot.map((el) => endForSteps(el[0], stepsForZ, el[1]))
// const stepsFromFirstZtoNextZ = stepsToZ(currentSnapshot[0][0], currentSnapshot[0][1])
// stepsUsed+=stepsFromFirstZtoNextZ
// while(!theyAllEndedInZSpot(currentSnapshot)) {
//   currentSnapshot = currentSnapshot.map((el) => endForSteps(el[0], stepsFromFirstZtoNextZ, el[1]))
//   stepsUsed+=stepsFromFirstZtoNextZ
// }
// console.log(stepsUsed)

const numsToMultiply = startingKeys.map((el) => stepsToZ(el))
console.log(numsToMultiply)



// found gcd and lcm online

const gcd = (num1, num2) => {
  //if num2 is 0 return num1;
  if(num2 === 0){
     return num1;
  }
  
  //call the same function recursively
  return gcd(num2, num1 % num2);
}

const lcm = (n1, n2) => {
  //Find the gcd first 
  let aaa = gcd(n1, n2);

  //then calculate the lcm
  return (n1 * n2) / aaa;
}

const result = numsToMultiply.reduce((num, el) => lcm(num, el), 1)

console.log(result) // 13133452426987 ⭐️ Part 2
