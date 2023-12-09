const fs = require("fs");
const inputText = fs.readFileSync("./2023/AdventOfCode/day05/input.txt", "utf-8");
let inputArray = inputText.split("\n\n").filter((el) => el != "");
// const example = fs.readFileSync("./2023/AdventOfCode/day05/example.txt", "utf-8");
// let exampleArray = example.split("\n\n").filter((el) => el != ""); // Used to test with less data

// console.log(exampleArray)
// exampleArray.forEach((el) => console.log(el))

const seeds = inputArray.shift().match(/\d+/g).map((seed) => Number(seed))
const inputMaps = inputArray

// console.log(inputMaps[0])

// console.log(seeds)

// an input map looks like
// seed-to-soil map:
// 50 98 2
// 52 50 48
// in the case above, the source is "seed" and destination is "soil"
// this should return ["seed", "soil"]
const getSourceAndDestFromInputMap = (inputMap) => {
  const split = inputMap.split("-")
  return [split[0], split[2].split(" ")[0]]
}
// console.log(getSourceAndDestFromInputMap(inputMaps[0]))

// for the example above, this should return an array of [[50, 98, 2], [52. 50. 58]]
const getDataFromInputMap = (inputMap) => {
  const arr = inputMap.split("map:")[1].split("\n").map((line) => line.split(" ").map((el) => Number(el)))
  return arr.filter((el) => el.length == 3)
}

// console.log(getDataFromInputMap(inputMaps[0]))
// getDataFromInputMap(inputMaps[0]).forEach((ar) => console.log(ar))

// given [52,50,3] we should create an object looking like
// { 50: 52, 51: 53, 52: 54 }
const createObjectMapForDataLine = (dataLineArray) => {
  const [dest, source, range] = dataLineArray
  let obj = {}
  for(let i = 0; i < range; i++){
    obj[source+i] = dest+i 
  }
  return obj
}

// console.log(createObjectMapForDataLine([52,50,3]))
// console.log(createObjectMapForDataLine([2797638787, 1764015146, 26675178]))

// AI exmaple
// const objGenerator = createObjectMapForDataLine([52,50,3]);

// for (const pair of objGenerator) {
//   console.log(pair);
// }


// passing [[52,50,3], [12,30,4]]
// we should get {30: 12, 31: 13, 32: 14, 33: 15, 50: 52, 51: 53, 52: 54}
// which represents the actual map object of the mapinput
const createMapObjectForDataStack = (dataStack) => {
  let obj = {}
  dataStack.forEach((dataLineArray) => {
    obj = {...obj, ...createObjectMapForDataLine(dataLineArray)}
  })
  return obj;
}

// console.log(createMapObjectForDataStack([[52,50,3], [12,30,4]]))

class Map {
  constructor(source, dest, dataArray, index){
    this.source = source
    this.dest = dest
    this.dataArray = dataArray
    this.index = index
  }

  // see if this number is in the rage of a virtual map object
  // if we have [450, 200, 100], 200 is where keys start, { 200: 300} and goes up to 300 because of range is 100 so 100+
  // so if we pass 250, we should be able to say true, cause 200 + 100 (range) = 300. So it is between 200 <> 300
  map(num) {
    let map = num
    for(let i = 0; i < this.dataArray.length; i++) {
      const [dest, source, range] = this.dataArray[i]
      // having [450, 200, 100]
      // if 250 >= 200 && < 300
      if(num >= source && num < source+range) {
        // if we find a valid case, then return the map number
        // for key 200, value would be 450
        // so for key 250, value would be 500 (i.e. +50)
        // How do we know it is 50? Maybe gap = num - source)
        // but what calculation would give us 500? dest + gap?
        // that would mean map = dest + gap

        // other examples:
        // having [20, 70, 3] and we pass number 71
        // 71 >= source && < (70+3=73)
        // gap = 71 - 70 => 1
        // map = dest + gap => 20 + 1 => 21, which is correct 🤔
        const gap = num - source
        map = dest + gap
        break
      }
    }
    return map
  }

  // if we have [[450, 200, 100], [112, 220, 50]]
  // return 200 as it is the lowest possible destination
  lowestPossibleDest() {
    return this.dataArray.map((el) => el[0]).sort((a,b) => a-b)[0]
  }

  findReverseMap() {
    // having the lowest possible dest, e.g. 200, see if it exist in lower map, 
    // and which number it would be (so we can do the same down the tree)
    const lowestDest = this.lowestPossibleDest() // e.g. 200
    const mapObjToCheck = allRealMaps[this.index-1] // e.g. we are in humidity-to-location, so this would be temp-to-humidity
    if(mapObjToCheck.canIMap(num)) {
      // this is true if 
    }
  }

  // example:
  // hum-to-location lowest is
  // 5 29 3
  // meaning, 5 is the lowest (destination). But it would come from 29
  // does the previous map object have the ability to map a number that return 29?
  // meaning, is 29 any of previous map obj destinations? If so, what is the key that would return that?
  // if we find such key, then we could check if previous previous map object have such key as a destination and so on down the tree
  findKeyForDestination(num) {
    let key = false
    const relevantRanges = this.dataArray.filter((el) => num >= el[0])

    for(let i = 0; i < relevantRanges.length; i++) {
      const [dest, source, range] = relevantRanges[i]
      if(num >= dest && num < dest+range) {
        const gap = num - dest
        key = source + gap
        break
      }
    }
    return key
  }

  canIMap(num) {
    let iCan = false
    for(let i = 0; i < this.dataArray.length; i++) {
      const [dest, source, range] = this.dataArray[i]
      // having [450, 200, 100]
      // if 250 >= 200 && < 300
      if(num >= source && num < source+range) {
        iCan = true
        break
      }
    }
    return iCan
  }
}

const allRealMaps = inputMaps.map((inputMap, index) => {
  const [source, dest] = getSourceAndDestFromInputMap(inputMap)
  const data = getDataFromInputMap(inputMap)

  return new Map(source, dest, data, index)
})

// console.log(allRealMaps[0].map(768975))


// Changing approach. Old approach was running out of memory
// We can't create a map object. Let's use Maths to determinate
// The object value

const findLocationForSeed = (seedNumber) => {
  let location = seedNumber
  allRealMaps.forEach((mapObject) => {
    const mapResult = mapObject.map(location)
    // if map doesn't have this number, then the number is the same (the puzzle describes)
    location = mapResult || location
  })
  return location;
}

const lowestLocation = (seedsArray) => {
  const locations = []
  seedsArray.forEach((seed) => {
    locations.push(findLocationForSeed(seed))
  })
  return Math.min(...locations)
}

// console.log(lowestLocation(seeds)) // 57075758 ⭐️ PART 1

// according to part 2, if seeds are: 21 30 22 24 64 23
// that means that we need to see it as [[21, 5], [30, 22], [64,23]]
// where 21 is a starting point and 30 is a range for adding more seeds
// so for the first array is telling us that we have and should test
// the seeds 21, 22, 23, 24 and 25. The second array says to test 30, 31... up to 30+22-1 = 51

const createSeedsArrays = (seeds) => {
  const arr = []
  for(let i = 0; i < seeds.length; i+=2) {
    arr.push([seeds[i], seeds[i+1]])
  }
  return arr;
}

const seedsArray = createSeedsArrays(seeds)
// console.log(seeds.length) // 20
// console.log(seedsArray.length) // we should have 10 ✅

const findFirstKeyFor = (lastDestination) => {
  let key = lastDestination
  for(let i = allRealMaps.length - 1; i > -1; i--) {
    key = allRealMaps[i].findKeyForDestination(key)
    if(!key) break
  }
  return key
}


const sortedSeedsArray = seedsArray.sort((a, b) => a[0] - b[0]);

// check if the seed exist
const isValidSeed = (seed) => {
  // if I want to check if seed 768980 exists, is not worth checking if the ranges starting on 56868281 or above
  const applicableRanges = sortedSeedsArray.filter((arr) => arr[0] <= seed)
  let found = false
  let startNumber
  let range
  for(let i = 0; i < applicableRanges.length; i++) {
    startNumber = applicableRanges[i][0]
    range = applicableRanges[i][1]
    if(seed >= startNumber && seed < startNumber+range-1) {
      found = true
    }
  }
  return found
}

let firstSeedFound
let possibleSeed
let i = 0
while(!firstSeedFound) {
  possibleSeed = findFirstKeyFor(i)
  if(possibleSeed) {
    if(isValidSeed(possibleSeed)) {
      console.log('seems legit ', possibleSeed) // was 3013013038
       console.log('found it with this i, meaning this location ', i) // 31161857 ⭐️ PART 2!!
      firstSeedFound = possibleSeed // then 3267749434
    }
  }
  i++
}
