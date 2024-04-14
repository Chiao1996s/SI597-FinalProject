const addNumbers = (first, second) => {
  return first + second;
}

if (typeof module !== 'undefined') {
  module.exports = {
    addNumbers
  }
}

