export function ra(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// return random value from weighted array
export function rw(object, save = true) {
  if (!object.array) {

    const array = [];
    for (const key in object) {
      for (let i = 0; i < object[key]; i++) {
        array.push(key);
      }
    }

    save && Object.defineProperty(object, "array", {enumerable: false, configurable: true, writable: false, value: array});
  }

  return object.array[Math.floor(Math.random() * object.array.length)];
}

export function P(probability) {
  return Math.random() < probability;
}

export function camelize(str) {
  return str
    .toLowerCase()
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/[()]/g, "") // remove parentheses
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase())
    .replace(/^[0-9]/, "_"); // first char should not be a number
}