const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day07/input.txt", "utf-8");
let inputArray = inputText.split("\n").filter((el) => el != "");

// console.log(inputArray)

const HANDS_TO_RANK = {
  'five of a kind': 7,  // AAAAA [5]
  'four of a kind': 6,  // AAAAB [4,1]
  'full house': 5,      // AAABB [3,2]
  'three of a kind': 4, // AAABC [3,1,1]
  'two pair': 3,        // AABBC [2,2,1]
  'one pair': 2,        // AABCD [2,1,1,1]
  'high card': 1        // ABCDE [1,1,1,1,1]
}

const CARD_TO_VALUE = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1
}

const CARD_TO_VALUE_WITH_JOKERS = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1
}

class Hand {
  constructor(cards, bid, cardValues){
    this.cards = cards
    this.bid = bid
    this.cardValues = cardValues
  }

  repetitionsObject() {
    const obj = {}
    this.cards.forEach((card) => {
      if(!obj[card]) {
        obj[card] = 1
      } else {
        obj[card] += 1
      }
    })
    return obj
  }

  countOfCard(card) {
    return this.cards.filter((el) => el == card).length
  }

  // the values of the obj we create with repetitionsObject() tell us the best combination
  // e.g. 5 = 5 times the same card. [3,2] would mean 3 times of 1 card, 2 of another, etc
  getHandRank() {
    const obj = this.repetitionsObject()
    const valuesSorted = Object.values(obj).sort((a,b) =>b-a).join("")
    let rank = 1
    switch(valuesSorted) {
      case '5':
        rank = 7
        break;
      case '41':
        rank = 6
        break;
      case '32':
        rank = 5
        break;
      case '311':
        rank = 4
        break;
      case '221':
        rank = 3
        break;
      case '2111':
        rank = 2
        break;
      default:
        rank = 1
        break;
    }
    return rank
  }

  // returns 1 or 0 so it can be used in an array.sort(a,b) => b-a
  isBetterThanHand(hand, useJoker = false) {
    const thisRank = useJoker ? this.getRankWithJokers() : this.getHandRank()
    const otherRank = useJoker ? hand.getRankWithJokers() : hand.getHandRank()

    if(thisRank != otherRank) {
      return thisRank > otherRank ? 1 : 0
    }

    let yes
    for(let i = 0; i<this.cardValues.length; i++){
      if(this.cardValues[i] != hand.cardValues[i]) {
        yes = this.cardValues[i] > hand.cardValues[i]
        break;
      }
    }
    return yes ? 1 : 0
  }

  getRankWithJokers() {
    let rank = this.getHandRank()
    const hasJ = this.cards.includes('J')

    if(!hasJ) return rank
    
    // keep in mind HANDS_TO_RANK when returning new rank
    // if there was not even pair then J would try to make a pair with rank 2
    if (rank == 1) return 2

    // if we have a pair like [AABCJ] you could have [AAABC]
    // if you have [JJABC] you could have [AAABC]
    // in both cases you end up with a three of a kind rank 4
    if (rank == 2) return 4

    // if you have 2 pairs:
    // e.g. [AABBJ] you could turn it into [AAABB] full house rank 5
    // e.g. [JJAAB] you could turn it into [AAAAB] 4 of a kind rank 6
    // so we need to check if 1 of the pairs is using the Js
    if (rank == 3) {
      return this.countOfCard('J') == 2 ? 6 : 5
    }

    // If we have 3 of a kind
    // e.g. [AAABJ] we can have 4 of a kind rank 6 [AAAAB]
    // e.g. [JJJAB] we can have 4 of a kind rank 6 [AAAAB]
    if (rank == 4) return 6

    // if we have full house
    // e.g. [AAAJJ] we can have 5 of a kind rank 7 [AAAAA]
    // e.g. [JJJAA] we can have 5 of a kind rank 7 [AAAAA]
    if (rank == 5) return 7

    // if we have 4 of a kind
    // e.g. [AAAAJ] we can have 5 of a kind rank 7 [AAAAA]
    // e.g. [JJJJA] we can have 5 of a kind rank 7 [AAAAA]
    if (rank == 6) return 7

    // if you have 5 of a kind, you can't do better
    return 7
  }

  // for part 2
  isBetterThanHandWithJokers(hand) {
    return this.isBetterThanHand(hand, true)
  }
}

const hands = inputArray.map((hand) => {
  const arr = hand.split(" ")
  const cards = arr[0].split("")
  return new Hand(cards, Number(arr[1]), cards.map((c) => CARD_TO_VALUE[c]))
})

// for PART 2
const handsWithJokers = inputArray.map((hand) => {
  const arr = hand.split(" ")
  const cards = arr[0].split("")
  return new Hand(cards, Number(arr[1]), cards.map((c) => CARD_TO_VALUE_WITH_JOKERS[c]))
})


// console.log(hands[4].getHandRank())

// sort hands according to rank
// const sortedHands = hands.sort((a,b) => b.isBetterThanHandWithJokers(a) - a.isBetterThanHandWithJokers(b))

// for PART 2
const sortedHands = handsWithJokers.sort((a,b) => b.isBetterThanHandWithJokers(a) - a.isBetterThanHandWithJokers(b))

// console.log(sortedHands[0].cards)
// console.log(sortedHands[0].cardValues)

let totalWinnings = 0
let currentRank = sortedHands.length
for(let i = 0; i < sortedHands.length; i++) {
  totalWinnings += sortedHands[i]['bid'] * currentRank
  currentRank--
}

console.log(totalWinnings) // 252656917 true for PART 1
                           // 253499763 true for PART 2 ⭐️
