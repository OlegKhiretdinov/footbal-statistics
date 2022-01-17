export const twoChar = (item) => {
  return Number(item) > 9 ? item : '0' + item
}

export const objDateToString = (objDate) => {
  return `${objDate.getFullYear()}-${twoChar(objDate.getMonth() + 1)}-${twoChar(objDate.getDate())}`
}
