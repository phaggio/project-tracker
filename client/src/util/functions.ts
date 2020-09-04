import { ItemType } from './dataTypes';

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

// given items array and item type, return an array of counts by types
const countByStatus = (itemType: string, items: ItemType[]) => {
  const countArr = [0, 0, 0, 0, 0]
  if (items.length === 0) return countArr;
  for (const item of items) {
    if (item.type === itemType) {
      switch (item.status) {
        case 'Open':
          countArr[0]++;
          break;
        case 'Active':
          countArr[1]++;
          break;
        case 'Completed':
          countArr[2]++;
          break;
        case 'In-review':
          countArr[3]++;
          break;
        case 'Closed':
          countArr[4]++;
          break;
        default:
          break;
      }
    }
  }
  return countArr;
}

export {
  parseTags,
  capitalizeWord,
  countByStatus
}