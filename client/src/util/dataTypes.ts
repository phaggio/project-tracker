type PathPropsType = {
  history: boolean;
  location: string;
  match: MatchType;
};

type MatchType = {
  isExact: boolean;
  params: MatchParamsType;
  path: string;
  url: string;
};

type MatchParamsType = {
  parentType: string | undefined;
  parentId: string | undefined;
  id: string | undefined;
  projectId: string | undefined;
  type: string | undefined;
};

type NewProjectType = {
  name: string;
  description: string;
  tags: string[];
};

type ProjectType = {
  _id: string;
  name: string,
  description: string;
  status: string;
  type: string;
  tags: string[];
  projectId: string;
};

type NewItemType = {
  parentId: string | null;
  parentType: string | null;
  projectId: string | null;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
};

type ItemType = {
  _id: string;
  parentId: string | null;
  parentType: string | null;
  projectId: string | null;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
};

type NewUserType = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
};

type UserType = {
  _id: string;
  type: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
};

type ParentType = {
  _id: string;
  type: string;
  name: string;
  projectId: string;
};


export type {
  PathPropsType,
  MatchType,
  MatchParamsType,
  NewProjectType,
  ProjectType,
  NewItemType,
  ItemType,
  NewUserType,
  UserType,
  ParentType
};