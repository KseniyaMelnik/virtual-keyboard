const toggleCase = (str) => {
  let stringArray = str.valueOf().split(''); // Turn string into array

  stringArray = stringArray.map((current) => {
    if (current.toLowerCase() === current) {
      return current.toUpperCase(); // If a character is lowercase, switch to uppercase
    }
    return current.toLowerCase(); // Else, switch to lowercase
  });
  return stringArray.join(''); // Join array into string again
};

export default toggleCase;
