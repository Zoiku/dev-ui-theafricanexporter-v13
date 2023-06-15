export const getToken = () => {
  const token =
    sessionStorage.getItem("token") !== null
      ? sessionStorage.getItem("token")
      : null;

  if (token) {
    return token;
  } else {
    return null;
  }
};

export const setSessionToken = (token) => {
  sessionStorage.setItem("token", token);
};

export const calculateRatio = (a, b) => {
  if (b !== 0) {
    const gcd = calculateGCD(a, b);
    const ratio = `${a / gcd}:${b / gcd}`;
    return ratio;
  } else {
    throw new Error("Cannot divide by zero.");
  }
};

export const calculateGCD = (a, b) => {
  if (b === 0) {
    return a;
  } else {
    return calculateGCD(b, a % b);
  }
};

export const reduce = (array) => {
  const count = {};
  for (const element of array) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }
  return count;
};

export const monthReduce = (array) => {
  const count = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };
  for (const element of array) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }

  return count;
};

export const sumArray = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      sum += arr[i];
    }
  }
  return sum;
};

// export const reduce = (array) => {
//   const count = {};
//   for (const element of array) {
//     if (count[element]) {
//       count[element] += 1;
//     } else {
//       count[element] = 1;
//     }
//   }
//   return count;
// };

// export const monthReduce = (array) => {
//   const count = {
//     January: 0,
//     February: 0,
//     March: 0,
//     April: 0,
//     May: 0,
//     June: 0,
//     July: 0,
//     August: 0,
//     September: 0,
//     October: 0,
//     November: 0,
//     December: 0
//   };
//   for (const element of array) {
//     if (count[element]) {
//       count[element] += 1;
//     } else {
//       count[element] = 1;
//     }
//   }

//   return count;
// };
