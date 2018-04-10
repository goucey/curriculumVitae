export function getRandomNum (startNumber, endNumber) {
  let random = Math.random()
  return Math.floor((random * (endNumber - startNumber + 1)) + startNumber)
}
