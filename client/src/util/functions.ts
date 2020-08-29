// util functions

// parse string and return an array of tags
const parseTags = (str: string): string[] => {
  // to lower case only
  const lowerCaseStr = str.toLowerCase();
  let outputArr: string[] = [];
  // only non-empty string, separated by comma
  lowerCaseStr.split(',').forEach((item: string) => {
    if (item.trim().length > 0) outputArr.push(item.trim());
  })

  // remove duplicate tags
  return outputArr.filter((a, b) => outputArr.indexOf(a) === b);

}


const capitalizeWord = (str: string) => {
  if (str.length > 0) {
    return (`${str.charAt(0).toUpperCase()}${str.slice(1)}`)
  }
}

export {
  parseTags,
  capitalizeWord
}