function organizeGifts(gifts) {
  // Code here
  const arr = gifts.match(/\d+[a-zA-Z]/g)
  let system = ''

  arr.forEach((el) => {
    const letter = el.substring(el.length-1)
    let number = Number(el.substring(0,el.length-1))

    while(number - 50 >= 0) {
      system += `[${letter}]`
      number -= 50
    }

    while(number - 10 >= 0) {
      system += `{${letter}}`
      number -= 10
    }

    if(number > 0) {
      system += '('
      while(number > 0) {
        system += letter
        number--
      }
      system += ')'
    }

    return system
  })


  return system
}


// const organizeLetter = (gifts) => {
//   const letter = gifts.substring(gifts.length-1)
//   let number = Number(gifts.substring(0,gifts.length-1))

//   let system = ''

//   while(number - 50 >= 0) {
//     system += `[${letter}]`
//     number -= 50
//   }

//   while(number - 10 >= 0) {
//     system += `{${letter}}`
//     number -= 10
//   }

//   if(number > 0) {
//     system += '('
//     while(number > 0) {
//       system += letter
//       number--
//     }
//     system += ')'
//   }

//   return system
// }



console.log(organizeGifts('76a11b'))