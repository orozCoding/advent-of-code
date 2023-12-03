function findFirstRepeated(gifts) {
  // Code here

  let newArr = [];
  let i = 0;
  let id = null;
  while (i < gifts.length) {
    id = gifts[i];
    if (newArr.indexOf(id) >= 0) return id;
    newArr.push(id);
    i++;
  }

  return -1;
}
