type PathProps = {
  history: boolean;
  location: string;
  match: MatchType;
};

type MatchType = {
  isExact: boolean;
  params: ParamsType;
  path: string;
  url: string;
};

type ParamsType = {
  parentType: string | undefined;
  parentId: string | undefined;
  id: string | undefined;
};

type NewItemType = {
  status: string;
  parentId: string | null;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
};

type ItemType = {
  _id: string;
  parentId: string | null;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
};

type ProjectType = {
  _id: string;
  name: string,
  description: string;
  status: string;
  type: string;
  tags: string[];
};

type NewProjectType = {
	name: string;
	description: string;
	tags: string[];
};

type UserType = {
  _id: string;
  type: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
};

// payload type for updating item parent info.
type ParentPayloadType = {
  parentType: string | null;
  parentName: string;
  parentId: string | null
};

type ParentType = {
  _id: string;
  type: string;
  name: string;
};

type AssigneePayloadType = {
  assigneeId: string | null;
  assignee: string;
}

export type {
  PathProps,
  MatchType,
  ParamsType,
  NewItemType,
  ItemType,
  ProjectType,
  NewProjectType,
  UserType,
  ParentPayloadType,
  ParentType,
  AssigneePayloadType
};