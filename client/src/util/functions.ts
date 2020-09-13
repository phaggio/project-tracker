import { ItemType, ParentType, ProjectType } from './dataTypes';

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
  if (str.length > 0) return (`${str.charAt(0).toUpperCase()}${str.slice(1)}`)
}

// given items array and item type, return an array of counts by types
const countByStatus = (type: string, items: ProjectType[] | ItemType[]) => {
  const countArr = function (dataType) {
    if (dataType === 'project') return [0, 0];
    return [0, 0, 0, 0, 0]
  }(type);

  if (items.length === 0) return countArr;
  for (const item of items) {
    if (type === 'project') {
      switch (item.status) {
        case ('Open'):
          countArr[0]++;
          break;
        case ('Archived'):
          countArr[1]++;
          break;
        default:
          break;
      }
    } else {
      if (item.type === type || type === 'all') {
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
  }
  return countArr;
}

const findParentsByType = (targetTypes: string[], parentArr: ParentType[]) => {
  const filteredArr = parentArr.filter(parent => {
    return targetTypes.includes(parent.type);
  })
  return filteredArr;
}

// takes parentId and array of parent objs, return parent name
const findParentNameById = (parentId: string | null, parents: ParentType[]): string => {
  let parentName = '(open)';
  if (parentId === null) return parentName;
  parents.forEach(parent => {
    if (parent._id === parentId) parentName = parent.name
  })
  return parentName;
}

const findProjectIdByItemId = (itemId: string, items: ItemType[]): string | null => {
  let matchedItem = items.find(item => item._id === itemId)
  return matchedItem ? matchedItem.projectId : null;
}

const camelToNormal = (camelName: string) => {
  let normal = camelName[0].toUpperCase();
  for (let i = 1; i < camelName.length; ++i) {
    if (camelName[i] === camelName[i].toUpperCase()) {
      normal += ' ';
      normal += camelName[i].toUpperCase();
    } else {
      normal += camelName[i]
    }
  }
  return normal;
}

const countItemsByType = (type: string, items: ItemType[]) => {
  if (items.length === 0) return 0;
  return items.filter(item => item.type === type).length;
}

const findParentByParentId = (id: string | null, parents: ParentType[]): ParentType | null => {
  if (id === null) return null;
  let parent = parents.find(parent => parent._id === id);
  return parent ? parent : null;
}

export {
  parseTags,
  capitalizeWord,
  countByStatus,
  findParentsByType,
  findParentNameById,
  findProjectIdByItemId,
  camelToNormal,
  countItemsByType,
  findParentByParentId
}