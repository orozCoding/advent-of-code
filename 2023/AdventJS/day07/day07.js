function drawGift(size, symbol) {
  // Code here
  let gift = ''

  const endIndex = size + (size-1)
  let limit = 0

  for(let i = 0; i < endIndex; i++) {
    for(let x = 0; x < size-i-1; x++) {
      gift += ' '
    }

    // end and beggining
    if(i === 0 || i === endIndex - 1) {
      for(let x = 0; x < size; x++) {
        gift += '#'
      }
      gift += '\n'
      continue
    }

    // middle spot
    if(i == size-1) {
      for(let x = 0 ; x < size ; x++) {
        gift += '#'
      }
      for(let x = size + 1; x <= endIndex ; x++) {
        gift += x < endIndex ? symbol : '#'
      }
    }

    if(i < size-1) {
      limit = i + size
      for(let x = 1 ; x <= limit ; x++) {
        gift += (x === 1 || x === size || x === limit) ? '#' : symbol
      } 
    } else if (i > size-1) {
      limit = endIndex - (i - size)
      for(let x = 1 ; x < limit ; x++ ) {
        gift += (x === 1 || x === size || x === limit-1) ? '#' : symbol
      }
    }

    gift += '\n'
  }

  return gift
}

console.log(drawGift(5, '+'))