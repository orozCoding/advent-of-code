function createChristmasTree(ornaments, height) {
  
  let tree = ''
  let indent
  let o = 0
  
  for(let i = 1; i <= height; i++){
    indent = height - i

    for(let x = 0; x<indent;x++) {
      tree+= ' '
    }

    for(let y = 0 ; y < i ; y++) {
      if (y > 0) tree += ' '
      tree += ornaments[o]

      if (o + 1 > ornaments.length - 1) {
        o = 0
      } else {
        o++
      }
    }
    tree += '\n'
  }

  for(let z = 1 ; z <= height - 1 ; z++) {
    tree += ' '
  }

  tree += '|\n'

  return tree
}

// console.log(createChristmasTree('*@o', 3))
console.log(createChristmasTree('x', 3))