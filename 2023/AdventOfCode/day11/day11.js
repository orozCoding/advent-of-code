const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day11/input.txt", "utf-8");
let inputArray = inputText.split("\n");

// console.log(inputArray)

const expandedMap = (map) => {
  const mapWithExpandedRows = []
  const indexesOfGalaxies = []
  map.forEach((row) => {
    const arr = row.split("")
    mapWithExpandedRows.push(arr)

    if(!arr.includes('#')) {
      mapWithExpandedRows.push([...arr])
    }

    arr.forEach((col, index) => {
      if(col == '#') {
        indexesOfGalaxies.push(index)
      }
    })
  })

  const indexesWithoutGalaxies = []
  for(let i = 0; i < indexesOfGalaxies.length; i++) {
    if(!indexesOfGalaxies.includes(i) && !indexesOfGalaxies.includes(i)) indexesWithoutGalaxies.push(i)
  }

  // mapWithExpandedRows.forEach((row) => indexesWithoutGalaxies.forEach((index) => {
  //   row.splice(index+1, 0, 'S')
  // }))

  let actualIndexWithoutGalaxy
  for(let i = 0;i<indexesWithoutGalaxies.length;i++) {
    // i will be the current el on array, but will also tell us how many cols we've added
    // and we need to sum that to the original index inside indexesWithoutGalaxies, because
    // those indexes are "more to the right" since we've been adding more and more new cols
    actualIndexWithoutGalaxy = indexesWithoutGalaxies[i] + i
    mapWithExpandedRows.forEach((row) => {
      row.splice(actualIndexWithoutGalaxy, 0, '.')
    })

  }

  return mapWithExpandedRows
}


const expandedUniverse = expandedMap(inputArray)
// expandedUniverse.forEach((row) => console.log(row))

// having a map (array of arrays, like in a y,x plane)
// count steps to reach from 1 coord to the other (less posible count)
// using only steps that move up, down, left
const stepsBetweenGalaxies = (origin, destiny) => {
  // let's try some math
  // if I'm in spot 1 and need to go to index 7
  // I need 6 steps. i.e. I need 7-1
  // if I'm in step 6 and I need to go to 9 i need 3 steps. i.e 9 - 3

  // now... in the y direction, this will always be positive because of how we're doing the loop
  // but how to handle  when we move from 9 to 3 (in the x)?
  // it is the same but we need to make it positive in the end
  return (destiny[0] - origin[0] + Math.abs(destiny[1] - origin[1]))
}

// console.log(stepsBetweenGalaxies(expandedUniverse, [0, 4], [2, 0])) // seems to be working

// now that we can successfully count steps between coords A and coords B, we need now to actually get
// an array of pairs of coords to test. i.e. all the pairs

// first, let's get simply all the coords of the galaxies

const galaxyCoords = (map) => {
  const galaxiesCoords = []
  map.forEach((row, yIndex) => {
    row.forEach((col, xIndex) => {
      if(col == '#') galaxiesCoords.push([yIndex, xIndex])
    })
  })
  return galaxiesCoords
}

const gCoords = galaxyCoords(expandedUniverse)

const countAllSteps = (galaxiesCoords) => {
  let steps = 0
  // let's do a for loop, and count the steps between i galaxy and i+1 galaxy coords :)
  for(let i = 0; i<galaxiesCoords.length - 1; i++){
    for(let x = i+1; x<galaxiesCoords.length; x++) {
      steps += stepsBetweenGalaxies(galaxiesCoords[i], galaxiesCoords[x])
    }
  }
  return steps
}

// console.log(countAllSteps(gCoords)) // 10885634 correct for PART 1 ⭐️

// for part 2, instead of expanding the map once per case, we need to expand per 1Million

// instead of creating an array with 1million columns for each expansion, let's mark where the expansion needs to happen
// and for every time the steps count would touch any of these "prone to expand" places, we add 1million

const originalMap = inputArray.map((el) => el.split(""))
console.log(originalMap)

const indexesProneToExpand = (map) => {
  const yIndexesWithGalaxies = []

  const xIndexes = []
  map.forEach((row, xIndex) => {
    if(!row.includes('#')) {
      xIndexes.push(xIndex)
    }

    row.forEach((col, index) => {
      if(col == '#') {
        yIndexesWithGalaxies.push(index)
      }
    })
  })

  const yIndexes = []
  for(let i = 0; i < yIndexesWithGalaxies.length; i++) {
    if(!yIndexesWithGalaxies.includes(i) && !yIndexes.includes(i)) {
      yIndexes.push(i)
    }
  }

  return [yIndexes, xIndexes]
}

const blackHoles = indexesProneToExpand(originalMap)

const gCoordsWithoutExpanding = galaxyCoords(originalMap)

const stepsBetweenExpandedGalaxies = (expantionCoords, origin, destiny) => {
  let stepsCount = (destiny[0] - origin[0] + Math.abs(destiny[1] - origin[1]))

  // now, for every "expansion" spot we need to pass over, add x number of steps
  // if one spot is in x index 8, and we need to move from 2 to 9, we would "pass through(?)" it
  // also keep in mind we could go from 9 to 2.
  // So it's pretty much about if for every "expantion" is in beyween of destiny or origin
  const [yExpantionCoords, xExpantionCoords] = expantionCoords

  // in the y axis we always go from lower to greater number
  // we would pass through  a "expanding" row when we move vertically, and an "expanding" column when moving in the x axis (horizontal)
  xExpantionCoords.forEach((index) => {
    if(origin[0] <= index && index <= destiny[0]) {
      stepsCount+= 1000000-1 // starting with 10 just to test with example input
    }
  })

  let orderedIndexes
  yExpantionCoords.forEach((index) => {
    orderedIndexes = destiny[1] > origin[1] ? [origin[1], destiny[1]] : [destiny[1], origin[1]]
    if(orderedIndexes[0] <= index && index <= orderedIndexes[1]) {
      stepsCount += 1000000-1 // "10 times bigger" (dont count the one that already exist)
    }
  })

  return stepsCount
}

// console.log(stepsBetweenExpandedGalaxies(blackHoles, [0 , 3], [2, 0])) // seems to be right


const stepsThroughBlackHoles = (galaxiesCoords, blackHoles) => {
  let steps = 0
  // let's do a for loop, and count the steps between i galaxy and i+1 galaxy coords :)
  for(let i = 0; i<galaxiesCoords.length - 1; i++){
    for(let x = i+1; x<galaxiesCoords.length; x++) {
      steps += stepsBetweenExpandedGalaxies(blackHoles, galaxiesCoords[i], galaxiesCoords[x])
    }
  }
  return steps
}

console.log(stepsThroughBlackHoles(gCoordsWithoutExpanding, blackHoles))


// some findings after finishing and reviewing the code:
// you can get the "expanding" cols and rows by simply getting the galaxies coords and see which col or row is never present ammong them