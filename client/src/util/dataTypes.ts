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
  id: string;
};

type WorkItemType = {
  _id: string;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  parentType: string;
  parentName: string;
  parentId: string;
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
  parentId: string | null;
  parentName: string;
	assigneeId: string | null;
	assignee: string;
}

export type {
  PathProps,
  MatchObj,
  MatchParams,
  WorkItemType,
  FeatureType
};