function decode(message) {
  if (!message.includes("(")) return message;

  let msg = message;
  while (msg.includes("(")) {
    const lastOpenI = msg.lastIndexOf("(");
    const nextClosingI = msg.substring(lastOpenI).indexOf(")") + lastOpenI;

    const substring = msg.substring(lastOpenI + 1, nextClosingI);
    const subReversed = substring.split("").reverse().join("");
    msg = msg.replace("(" + substring + ")", subReversed);
  }
  return msg;
}