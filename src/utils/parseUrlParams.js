export const urlStringToObject = (str) => {
  if(str === "") return 
  const params = str.split('&').map(item => item.split('='))

  return Object.fromEntries(params)
}
