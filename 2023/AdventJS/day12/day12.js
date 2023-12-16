function getIndexsForPalindrome(word) {
  if(word == word.split("").reverse().join("")) return []

  let a // letters to change
  let b 
  let newWord

  for(let i = 0 ; i < word.length; i++) {
    a = word[i]
    for(let x = i+1 ; x < word.length ; x++ ) {
      b = word[x]
      newWord = word.split("")
      newWord.splice(i, 1, b)
      newWord.splice(x, 1, a)
      newWord = newWord.join("")
      if(newWord == newWord.split("").reverse().join("")) {
        return [i, x]
      }
    }
  }

  return null
}

console.log(getIndexsForPalindrome('anna')) // []
console.log(getIndexsForPalindrome('aaababa')) // [1,3] 
console.log(getIndexsForPalindrome('racata')) //  null