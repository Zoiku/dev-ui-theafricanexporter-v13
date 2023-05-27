export const searchObjects = (searchTerm, arrayOfObjects) => {
  // Create an empty array to store the matched objects
  let matchedObjects = [];

  // Loop through each object in the array
  for (let i = 0; i < arrayOfObjects.length; i++) {
    // Get the current object
    let obj = arrayOfObjects[i];

    // Loop through each property of the object
    for (let key in obj) {
      // Check if the property value contains the search term
      if (
        obj.hasOwnProperty(key) &&
        typeof obj[key] === "string" &&
        obj[key].toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        // Add the matched object to the array
        matchedObjects.push(obj);
        // Break the loop to avoid adding the same object multiple times
        break;
      }
    }
  }

  // Return the array of matched objects
  return matchedObjects;
};
