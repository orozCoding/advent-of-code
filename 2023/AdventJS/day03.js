function findNaughtyStep(original, modified) {
  // Code here
  if (original.length === 0) {
    if (modified[0]) return modified[0];
    return "";
  }
  if (original.length > 0 && modified.length === 0) return "";

  const longerLength = Math.max(original.length, modified.length);

  for (let i = 0; i < longerLength; i++) {
    if (original[i] == modified[i]) continue;
    if (original[i] != modified[i]) {
      if (modified[i] == undefined) return original[i];
      if (original[i] == undefined) return modified[i];
      if (original[i + 1] == modified[i]) return original[i];
      return modified[i];
    }
  }

  return "";
}

console.log(findNaughtyStep("", 2));
