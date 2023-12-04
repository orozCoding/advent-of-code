function findFirstRepeated(gifts) {
  // Code here

  let newArr = [];
  for (let i = 0; i < gifts.length; i++) {
    const id = gifts[i];
    if (newArr.indexOf(id) >= 0) return id;
    newArr.push(id);
  }

  return -1;
}
