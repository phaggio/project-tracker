type PathProps = {
  history: boolean;
  location: string;
  match: MatchObj;
};

type MatchObj = {
  isExact: boolean;
  params: MatchParams;
  path: string;
  url: string;
};

type MatchParams = {
  type: string;
  name: string;
  id: string;
};

type WorkItemType = {
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
}

export type {
  PathProps,
  MatchObj,
  MatchParams,
  WorkItemType,
  FeatureType,
  ProjectType,
  ParentPayloadType
};