function cyberReindeer(road, time) {
  // Code here
  let currentRoad = road;
  const result = [road];
  let charBeforeSanta = ".";
  let nextPosition = 1;
  for (let i = 1; i < time; i++) {
    if (i == 5) {
      currentRoad = currentRoad.replaceAll("|", "*");
    }
    if (currentRoad[nextPosition] != "|") {
      currentRoad = currentRoad.split("");
      currentRoad.splice(nextPosition - 1, 1, charBeforeSanta);
      charBeforeSanta = currentRoad[nextPosition];
      currentRoad.splice(nextPosition, 1, "S");
      currentRoad = currentRoad.join("");
      nextPosition++;
    }
    result.push(currentRoad);
  }
  return result;
}

const road = "S..|...|..";
const time = 10; // units of time
const result = cyberReindeer(road, time);

result.forEach((rd) => console.log(rd));
