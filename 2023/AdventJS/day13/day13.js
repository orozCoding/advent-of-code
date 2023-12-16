function checkIsValidCopy(original, copy) {
  const degrations = ['#', '+', ':', '.', ' ']

  if(original.length != copy.length) return false
  
  for(let i = 0; i < original.length ; i++) {
    if(original[i] != copy[i]) {
      // could be improved by simply avoiding repetetive checks
      // and/or only checking for false or allowed cases
      // we could also create only 1 if, with multiple || 
      if (/[a-zA-Z]/.test(original[i]) && /[a-zA-Z]/.test(copy[i]) && original[i].toUpperCase() != copy[i].toUpperCase()) return false
      if (/[a-z]/.test(original[i]) && /[A-Z]/.test(copy[i])) return false
      if (/[A-Z]/.test(original[i]) && /[a-z]/.test(copy[i])) continue
      if ((/[A-Z]/.test(original[i]) || /[a-z]/.test(original[i])) && degrations.indexOf[copy[i]] != -1) continue
      if (degrations.indexOf(original[i]) != -1 && degrations.indexOf(original[i]) < degrations.indexOf(copy[i])) continue
      return false
    }
  }

  return true
}

console.log(checkIsValidCopy('s#nta Cla#s is coming', 'p#nt: cla#s #s c+min#')) // false
console.log(checkIsValidCopy('Santa Claus', '###:. c:+##')) // true
console.log(checkIsValidCopy('S#nta Claus', 'S#ntA ClauS')) // false


