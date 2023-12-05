function decode(message) {
  if (!message.includes("(")) return message;

  const decodeMostCenteredCode = (msg) => {
    const lastOpenI = msg.lastIndexOf("(");
    const nextClosingI = msg.substring(lastOpenI).indexOf(")") + lastOpenI;

    const substring = msg.substring(lastOpenI + 1, nextClosingI);
    const subReversed = substring.split("").reverse().join("");
    const msgArray = msg.split("");
    msgArray.splice(lastOpenI, substring.length + 2, subReversed);

    return msgArray.join("");
  };

  let msg = message;
  while (msg.includes("(")) {
    msg = decodeMostCenteredCode(msg);
  }
  return msg;
}

console.log(decode("123(654)789"));
