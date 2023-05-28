export const searchObjects = (sentence, array) => {
  const results = [];
  const searchTerms = sentence.toLowerCase().split(" ");

  for (const obj of array) {
    let isMatch = false;

    for (const value of Object.values(obj)) {
      if (
        typeof value === "string" &&
        containsAllTerms(value.toLowerCase(), searchTerms)
      ) {
        isMatch = true;
        break;
      }
    }

    if (isMatch) {
      results.push(obj);
    }
  }

  return results;
};

function containsAllTerms(text, searchTerms) {
  for (const term of searchTerms) {
    if (!text.includes(term)) {
      return false;
    }
  }
  return true;
}
