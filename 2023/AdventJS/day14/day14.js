function calculateTime(deliveries) {
  const numberToString = (num) => {
    const string = num.toString()

    if(num > 10) return string
    if(num >= 0) return '0'+string
    if(string.length > 2) return string
    const arr = string.split("")
    arr.splice(1,0,'0')
    return arr.join("")
  }

  let time = [0, 0, 0]
  deliveries.map((el) => {
    let delTime = el.split(":").map((num) => Number(num))
    time = [time[0]+delTime[0], time[1]+delTime[1], time[2]+delTime[2]]
  })

  while(time[2] - 60 >= 0) {
    time = [time[0], time[1]+1, time[2]-60]
  }

  while(time[1] - 60 >= 0) {
    time = [time[0]+1, time[1]-60, time[2]]
  }

  // substract 7

  let negative = false
  if(time[0] >= 7) {
    time.splice(0, 1, time[0] - 7)
  } else {
    negative = true
    if(time[2] != 0) {
      time = [time[0], time[1] + 1, 60 - time[2]]
      if(time[1] < 0) {
        time.splice(1,1,time[1]+60)
      }
    }
    if(time[1] != 0) {
      time = [time[0] + 1, 60 - time[1], time[2]]
    }

    time.splice(0, 1, time[0] - 7)
  }


  let string = time.map((el) => numberToString(el)).join(":")

  if(negative && string[0] != '-') return '-'+string

  return string
}

console.log(calculateTime(['00:10:00', '01:00:00', '03:30:00'])) // '-02:20:00'
console.log(calculateTime(['02:00:00', '05:00:00', '00:30:00'])) // 00:30:00
console.log(calculateTime([
  '00:45:00',
  '00:45:00',
  '00:00:30',
  '00:00:30'
])) // '-05:29:00'
console.log(calculateTime(['01:00:00', '05:00:00', '00:30:00'])) // "-00:30:00"
console.log(calculateTime(['01:01:01', '03:59:59', '01:01:01', '00:57:58']))// "-00:00:01"
