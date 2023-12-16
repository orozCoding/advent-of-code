function adjustLights(lights) {
  // Code here

  const red = '🔴'
  const green = '🟢'

  let count = 0
  let newLights = [...lights]
  for(let i = 0 ; i < newLights.length ; i++){
    if(newLights[i] == newLights[i+1]){
      count++
      newLights.splice(i+1, 1, newLights[i+1] == red ? green : red)
      i = 0
    }
  }

  let reveverseCount = 0
  newLights = [...lights].reverse()
  for(let i = 0 ; i < newLights.length ; i++){
    if(newLights[i] == newLights[i+1]){
      reveverseCount++
      newLights.splice(i+1, 1, newLights[i+1] == red ? green : red)
      i = 0
    }
  }

  return Math.min(count, reveverseCount)
}
