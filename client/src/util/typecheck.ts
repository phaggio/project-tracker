import { ProjectType, ItemType, UserType, ParentType } from './dataTypes';

const isProjectType = (target: any): target is ProjectType => {
  if ((target as ProjectType).type) return true;
  return false;
};

const isItemType = (target: any): target is ItemType => {
  if ((target as ItemType).type) return true;
  return false;
};

const isItemTypeArray = (targetArr: any[]): boolean => {
  for (const target of targetArr) if (!(target as ItemType).type) return false;
  return true;
}

const isUserTypeArray = (targetArr: any[]): boolean => {
  for (const target of targetArr) if (!(target as UserType).type) return false;
  return true;
};

const isParentTypeArray = (targetArr: any[]): boolean => {
  for (const target of targetArr) if (!(target as ParentType).type) return false;
  return true;
}

export {
  isProjectType,
  isItemType,
  isItemTypeArray,
  isUserTypeArray,
  isParentTypeArray
}