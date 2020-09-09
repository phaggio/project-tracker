type ItemType = {
  parentId: string | null;
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
    status: 'Open',
    name: 'Create API routes',
    description: 'Create API routes for item collection.',
    type: 'workItem',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    status: 'Open',
    name: 'Work number 2',
    description: 'This is work number Two!.',
    type: 'workItem',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    status: 'Open',
    name: 'Work number 3',
    description: 'This is work number Three!.',
    type: 'workItem',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    status: 'Open',
    name: 'Work number 4',
    description: 'This is work number FOUR!.',
    type: 'workItem',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    status: 'Open',
    name: 'A new feature',
    description: 'This is a feature item!',
    type: 'feature',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    status: 'Open',
    name: 'New feature 2',
    description: 'New feature 2 for the project.',
    type: 'feature',
    tags: [],
    assigneeId: null
  },
  {
    parentId: null,
    status: 'Open',
    name: 'Another feature',
    description: 'This is another feature desc.',
    type: 'feature',
    tags: [],
    assigneeId: null
  }
]

export default itemSeed