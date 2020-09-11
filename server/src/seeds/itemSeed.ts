type ItemType = {
  parentId: string | null;
  parentType: string | null;
  projectId: string | null;
  status: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  assigneeId: string | null;
}

const itemSeed: ItemType[] = [
  {
    parentId: null,
    parentType: null,
    projectId: null,
    status: 'Open',
    name: 'Create API routes',
    description: 'Create API routes for item collection.',
    type: 'work',
    tags: ['tag1', 'tag2'],
    assigneeId: null
  },
  {
    parentId: null,
    parentType: null,
    projectId: null,
    status: 'Open',
    name: 'Work number 2',
    description: 'This is work number Two!.',
    type: 'work',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    parentType: null,
    projectId: null,
    status: 'Open',
    name: 'Work number 3',
    description: 'This is work number Three!.',
    type: 'work',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    parentType: null,
    projectId: null,
    status: 'Open',
    name: 'Work number 4',
    description: 'This is work number FOUR!.',
    type: 'work',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    parentType: null,
    projectId: null,
    status: 'Open',
    name: 'A new feature',
    description: 'This is a feature item!',
    type: 'feature',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    parentType: null,
    projectId: null,
    status: 'Open',
    name: 'New feature 2',
    description: 'New feature 2 for the project.',
    type: 'feature',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    parentType: null,
    projectId: null,
    status: 'Open',
    name: 'Another feature',
    description: 'This is another feature desc.',
    type: 'feature',
    tags: [],
    assigneeId: null
  }
]

export default itemSeed