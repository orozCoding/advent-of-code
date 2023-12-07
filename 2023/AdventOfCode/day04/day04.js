const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day04/input.txt", "utf-8");
const inputArray = inputText.split("\n");
const exampleInputText = fs.readFileSync("./2023/AdventOfCode/day04/exampleInput.txt", "utf-8");
const exampleInputArray = exampleInputText.split("\n"); // Used to test PART 2 with smaller input

// each line looks like:
// Card   1: 71 88 83  5 15 54 89 55 69 79 | 83 39 58 32 99 54 91 19 44  5 57 29 88  9 95 15 79 71 90 69 43 66 55 12 89
// So it has an ID, 10 numbers that can be 1 or 2 digits, representing winning numbers,
// a | divisor, and then 25 numbers that can be 1 or 2 digits, representing the numbers in the card to play with
// in this example, the Card has 

class Card {
  constructor(cartString) {
    this.id = Number(cartString.split(":")[0].replace(/[^0-9]/g, ""));
    this.winningNumbers = cartString.split(":")[1].split("|")[0].split(" ").filter((el) => el != "").map((num) => Number(num));
    this.playerNumbers = cartString.split(":")[1].split("|")[1].split(" ").filter((el) => el != "").map((num) => Number(num));
  }

  getId() {

  }

  matchesCount() {
    // first approach: thinking that no number is repeated on the winning array
    return this.playerNumbers.reduce((count, number) => {
      if(this.winningNumbers.includes(number)){
        return count + 1
      } else {
        return count
      }
    }, 0)
  }

  points() {
    let points = 0
    for(let i = 0; i < this.matchesCount(); i++) {
      if(points < 1) {
        points++
      } else {
        points *= 2
      }
    }
    return points;
  }

  // for part 2
  // if this card has 3 matches, it will add 3 copies of 3 cards with numbers that follow this cart's number
  // e.g. this card num is 3, and has 2 matches, then it adds 2 copies to the pile (array): cart 4 and card 5
  addCopiesToArray(allCardsArr){
    let cardToCopyId = this.id + 1
    for(let i = 0; i < this.matchesCount(); i++) {
      allCardsArr.push(allCardsArr.find((card) => card["id"] === cardToCopyId ))
      cardToCopyId++
    }
    return allCardsArr;
  }

}

const allCards = inputArray.map((line) => new Card(line))

const pointsInTotal = allCards.reduce((sum, cart) => sum + cart.points(), 0)

console.log(pointsInTotal) // 21088 ⭐️ PART 1

// PART 2

let cardsPile = [...allCards]
let card
for(let i = 0; i < cardsPile.length; i++) {
  card = cardsPile[i]
  card.addCopiesToArray(cardsPile)
}

console.log(cardsPile.length) // 6874754 ⭐️ PART 2