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
}

type ItemType = {
  _id: string;
  parentId: string | null;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
}

type WorkItemType = {
  _id: string;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  parentId: string | null;
  assigneeId: string | null;
  assignee: string;
};

type FeatureType = {
  _id: string;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  parentType: string | null;
  parentName: string;
  parentId: string | null;
  assigneeId: string | null;
  assignee: string;
};

type ProjectType = {
  _id: string;
  name: string,
  description: string;
  status: string;
  type: string;
  tags: string[];
  features: string[];
  workItems: string[];
  bugs: string[];
};

// payload type for updating item parent info.
type ParentPayloadType = {
  parentType: string | null;
  parentName: string;
  parentId: string | null
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
  WorkItemType,
  ItemType,
  FeatureType,
  ProjectType,
  ParentPayloadType,
  AssigneePayloadType
};