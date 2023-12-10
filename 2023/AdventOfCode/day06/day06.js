const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day06/input.txt", "utf-8");
let inputArray = inputText.split("\n").filter((el) => el != "");

// console.log(inputArray)

const times = inputArray[0].match(/\d+/g).map((el) => Number(el))
const distances = inputArray[1].match(/\d+/g).map((el) => Number(el))

// console.log(times)
// console.log(distances)

class Race {
  constructor(time, distance) {
    this.time = time
    this.distance = distance
  }

  waysToWinCount(){
    let count = 0;
    let speed = 0;
    let timeLeft = this.time
    let finalPosition = 0;
    for(let i = 1; i <= this.time; i++){
      speed = i
      timeLeft = this.time - i
      finalPosition = speed * timeLeft
      if(finalPosition > this.distance) {
        count++
      }
    }
    return count;
  }
}

const races = []
// we assume times and distances length are always the same
for(let i = 0; i < times.length; i++) {
  races.push(new Race(times[i], distances[i]))
}

// console.log(races[2].waysToWinCount())

const winsPerRace = []

races.forEach((race) => {
  winsPerRace.push(race.waysToWinCount())
})

// console.log(winsPerRace)

const result = winsPerRace.reduce((sum, wins) => sum * wins, 1)

console.log(result) // 2269432 PART 1 

// PART 2

const bigLargeRage = new Race(times.join(""), distances.join(""))

console.log(bigLargeRage.waysToWinCount())