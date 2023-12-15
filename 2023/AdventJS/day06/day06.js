function maxDistance(movements) {
  // Code here
  const leftMoves = movements.match(/>/g) || ''
  const rightMovements = movements.match(/</g) || ''
  const jokers = movements.match(/\*/g)?.length || 0

  const leftFirst = leftMoves.length >= rightMovements.length 

  if(leftFirst) return leftMoves.length - rightMovements.length + jokers

  return rightMovements.length - leftMoves.length + jokers
}


console.log(maxDistance('<<<<<'))