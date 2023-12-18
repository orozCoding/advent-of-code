function maxGifts(houses) {
  if(!houses) return 0
  if(houses.length == 1) return houses[0]
  if(houses.length == 2) return Math.max(...houses)
  if(houses.length == 3) return Math.max(houses[0] + houses[2], houses[1])
  let indexOfMax
  let right
  let left
  let sum = 0
  let allTries = []
  let housesCopy = [...houses]

  for(let i = 0 ; i < housesCopy.length ; i++) {
    indexOfMax = housesCopy.indexOf(Math.max(...housesCopy))
    max = housesCopy[indexOfMax]
    right = indexOfMax  == housesCopy.length - 1 ? 0 : housesCopy[indexOfMax+1]
    left = indexOfMax == 0 ? 0 : housesCopy[indexOfMax-1]
    if(max >= left+right){
      sum+= max
      housesCopy.splice(indexOfMax, 1, 0)
      housesCopy.splice(indexOfMax+1, 1, 0)
      if(indexOfMax != 0) housesCopy.splice(indexOfMax-1, 1, 0)

    } else {
      housesCopy.splice(indexOfMax, 1, 0)
    }
  }

  allTries.push(sum)
  // return Math.max(...allTries)

  let maxNum
  sum = 0
  let firstNum
  let visitedIndex
  for(let i = 0; i < houses.length ; i++) {
    housesCopy = [...houses]
    sum = 0
    firstNum = housesCopy[i]
    sum+= firstNum
    visitedIndex = i
    housesCopy.splice(visitedIndex,1,0)
    housesCopy.splice(visitedIndex-1 == -1 ? 0 : visitedIndex-1,1,0)
    housesCopy.splice(visitedIndex+1,1,0)
    for(let x = 0 ; x < houses.length ; x++) {
      maxNum = Math.max(...housesCopy)
      sum+=maxNum
      visitedIndex = housesCopy.indexOf(maxNum)
      housesCopy.splice(visitedIndex,1,0)
      housesCopy.splice(visitedIndex-1 == -1 ? 0 : visitedIndex-1,1,0)
      housesCopy.splice(visitedIndex+1,1,0)
    }
    allTries.push(sum)
  }

  return Math.max(...allTries)
}

console.log(maxGifts([1, 3, 1, 3, 100])) // 103 (3 + 100)
console.log(maxGifts([1, 2, 3, 1])) // 4
console.log(maxGifts([2, 7, 9, 3, 1])) // 12
console.log(maxGifts([1,1,1,1,1,1,1])) // 4
console.log(maxGifts([2, 99, 100, 99, 1])) // 198
console.log(maxGifts([2, 99, 100, 99, 1, 1, 99, 100, 99, 2])) // 396



// function maxGifts(houses) {
//   let maxNum
//   let sum = 0
//   let firstNum
//   let visitedIndex
//   let allTries = []
//   for(let i = 0; i < houses.length ; i++) {
//     housesCopy = [...houses]
//     sum = 0
//     firstNum = housesCopy[i]
//     sum+= firstNum
//     visitedIndex = i
//     housesCopy.splice(visitedIndex,1,0)
//     housesCopy.splice(visitedIndex-1 == -1 ? 0 : visitedIndex-1,1,0)
//     housesCopy.splice(visitedIndex+1,1,0)
//     for(let x = 0 ; x < houses.length ; x++) {
//       maxNum = Math.max(...housesCopy)
//       sum+=maxNum
//       visitedIndex = housesCopy.indexOf(maxNum)
//       housesCopy.splice(visitedIndex,1,0)
//       housesCopy.splice(visitedIndex-1 == -1 ? 0 : visitedIndex-1,1,0)
//       housesCopy.splice(visitedIndex+1,1,0)
//     }
//     allTries.push(sum)
//   }

//   return Math.max(...allTries)
// }
