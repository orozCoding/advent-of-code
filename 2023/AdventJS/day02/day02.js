function manufacture(gifts, materials) {
  let result = [];
  gifts.forEach((gift) => {
    if (gift.split("").every((letter) => materials.includes(letter))) {
      result.push(gift);
    }
  });

  return result;
}
