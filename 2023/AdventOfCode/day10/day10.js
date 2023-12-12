const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day10/input.txt", "utf-8");
let inputArray = inputText.split("\n");



const map = inputArray.map((el) => el.split(""))

const findSPosition = (map) => {
  const y = map.findIndex((el) => el.includes('S'))
  const x = map[y].indexOf('S')
  return [y,x]
}

// console.log(findSPosition(map)) // [1,1] for sample

// possibilities for each type [y,x]
// | => [+1, 0], [-1, 0] => can send you to north or south
// - => [0, +1], [0, -1] => can send you to west or east
// L => [-1, 0], [0, +1] => can send you to north or east
// J => [-1, 0], [0, -1] => can send you to north or west
// 7 => [0, -1], [+1, 0] => can send you to west or south
// F => [0, +1], [+1, 0] => can send you to east or south

// if you reach this type of pipe, and you come from this side of the pide
// where can it take you to?
// for PART 2, list this clockwise direction order (i.e. for '-', show west to east movement first)
const TYPE_TO_DEST_FOR_DIRECTION = {
  '|': {'north': 'south', 'south': 'north'},
  '-': {'west': 'east', 'east': 'west'},
  'L': {'east': 'north', 'north': 'east'},
  'J': {'north': 'west', 'west': 'north'},
  '7': {'west': 'south', 'south': 'west'},
  'F': {'south': 'east', 'east': 'south'}
}

const DEST_TO_NEW_COORDS = {
  'north': [-1, 0],
  'south': [+1, 0],
  'east': [0, +1],
  'west': [0, -1]
}

// if I'm moving to the south and I reach a | pipe
// in this | pipe I should say Im reaching this pipe from the north side
const SWITCH_DIRECTIONS = {
  'north': 'south',
  'west': 'east',
  'south': 'north',
  'east': 'west'
}

const move = (oldCoords, direction) => {
  const newCoords = DEST_TO_NEW_COORDS[direction]
  return [oldCoords[0]+newCoords[0],oldCoords[1]+newCoords[1]]
}

// if I'm comming from north, and I find a | I should only be able to go south
const nextMoveDirection = (commingDirection, pipeType) => {
  return TYPE_TO_DEST_FOR_DIRECTION[pipeType][commingDirection]
}

// console.log(nextMoveDirection('south', '|'))

const countForRoundMove = (map, startingCoords, startingType) => {
  // start at any possible direction
  let nextDirection = Object.keys(TYPE_TO_DEST_FOR_DIRECTION[startingType])[0]
  let coords = move(startingCoords, nextDirection)
  let currentPipe = map[coords[0]][coords[1]]
  let moveCount = 1
  while(currentPipe != 'S') {
    moveCount++
    nextDirection = nextMoveDirection(SWITCH_DIRECTIONS[nextDirection], currentPipe)
    coords = move(coords, nextDirection)
    currentPipe = map[coords[0]][coords[1]]
  }
  return moveCount
}

// console.log(countForRoundMove(map, findSPosition(map), SType))


const SType = '7' // manually checked, code fails if input.txt changes
// const countToFarthest = countForRoundMove(map, findSPosition(map), SType) / 2
// console.log(countToFarthest) // correct 7012 for PART 1 ⭐️


// PART 2
// "If you go clockwise, everything to the right side is inside"

const RIGHT_SIDE_OF_DIRECTION = {
  'north': 'east',
  'east': 'south',
  'south': 'west',
  'west': 'north'
}


const rightTile = (coords, directionUsed) => {
  const sideToCheck = RIGHT_SIDE_OF_DIRECTION[directionUsed]
  return move(coords, sideToCheck)
}

// console.log(isNextToTile(map, [7,3], 'west'))

const uniqueArrayFrom = (arr) => {
  const uniq = []
  const obj = {}
  arr.forEach((el) => {
    if(obj[el]) return
    obj[el] = el
    uniq.push(el)
  })
  return uniq
}


const countTitlesInside = (map, startingCoords, startingType) => {
    // start at any possible direction, and move clockwise
    const coordsInLoop = [startingCoords]
    let nextDirection = Object.values(TYPE_TO_DEST_FOR_DIRECTION[startingType])[0]
    const tilesToTheRightOfLoop = [rightTile(startingCoords, nextDirection)]
    let coords = move(startingCoords, nextDirection)
    coordsInLoop.push(coords)
    tilesToTheRightOfLoop.push(rightTile(coords,nextDirection))
    let currentPipe = map[coords[0]][coords[1]]
    while(currentPipe != 'S') {
      nextDirection = nextMoveDirection(SWITCH_DIRECTIONS[nextDirection], currentPipe)
      coords = move(coords, nextDirection)
      currentPipe = map[coords[0]][coords[1]]
      coordsInLoop.push(coords)
      tilesToTheRightOfLoop.push(rightTile(coords, nextDirection))
    }

    const tiles = tilesToTheRightOfLoop.filter((el) => !coordsInLoop.some((cel) => cel[0] == el[0] && cel[1] == el[1]))
    return tiles.length
}

console.log(countTitlesInside(map,findSPosition(map), SType))

// turns out that anything could be count as inside the loop. Doesn't need to be a '.'


// TODO, FOR EVERY F GOING TO SOUTH, COORDS AT NORTH ARE TITLES (BESIDES THE WEST COORDS IT WILL CHECK)
// FOR EVERY 7 GOING TO WEST, COORDS AT EAST ARE TILES (BESIDES THE NORTH COORDS IT WILL CHECK)