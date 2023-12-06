const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day02/input.txt", "utf-8");
const inputArray = inputText.split("\n");

// console.log(inputArray[0]);

// Game string looks like:
// Game 1: 4 red, 5 blue, 4 green; 7 red, 8 blue, 2 green; 9 blue, 6 red; 1 green, 3 red, 7 blue; 3 green, 7 red

const getGameId = (game) => {
  return game.split(":")[0].split(" ")[1];
};

const getGameCubeMaxNumber = (game, color) => {
  let arr = game.replace(/,|;/g, "").split(" ");
  let max = 0;
  let showed = 0;
  let index = arr.indexOf(color);
  while (index > -1) {
    showed = Number(arr[index - 1]);
    if (showed > max) {
      max = showed;
    }
    arr.splice(index - 1, 2);
    index = arr.indexOf(color);
  }
  return max;
};

const createGameObjects = (array) => {
  let gamesArr = [];
  array.forEach((game) => {
    gamesArr.push(
      new Game(getGameId(game), {
        red: getGameCubeMaxNumber(game, "red"),
        green: getGameCubeMaxNumber(game, "green"),
        blue: getGameCubeMaxNumber(game, "blue"),
      })
    );
  });
  return gamesArr;
};

// console.log(getGameCubeMaxNumber(inputArray[0], "red"));
// console.log(inputArray.splice(1, 3));
// console.log(createGameObjects(inputArray.splice(1, 3)));

class Game {
  constructor(id, maxObj) {
    this.id = Number(id);
    this.redMax = Number(maxObj["red"]);
    this.greenMax = Number(maxObj["green"]);
    this.blueMax = Number(maxObj["blue"]);
  }

  hasEnoughCubes(redTarget, greenTarget, blueTarget) {
    return this.redMax <= redTarget && this.greenMax <= greenTarget && this.blueMax <= blueTarget;
  }

  powerOfMinSet() {
    const result = this.redMin * this.greenMin * this.blueMin;
    return this.redMax * this.greenMax * this.blueMax;
  }
}

const gamesArray = createGameObjects(inputArray);
// console.log(gamesArray);

// puzzle ask us to sum ids of games that have enough 12, 13, 14 red,blue,green cubes
const viableGames = gamesArray.filter((game) => game.hasEnoughCubes(12, 13, 14));

const sumOfViableGamesId = viableGames.reduce((sum, game) => {
  return (sum += game["id"]);
}, 0);

console.log(sumOfViableGamesId); // 2061 ⭐️ Part 1

const sumOfMinSetPowers = gamesArray.reduce((sum, game) => {
  return (sum += game.powerOfMinSet());
}, 0);

console.log(sumOfMinSetPowers); // 72596 ⭐️ Part 2
