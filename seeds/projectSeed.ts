const projectSeed = [
  {
    _id: '101',
    name: 'Project Tracker',
    description: 'A web app that tracks project progress. User can add feature, work, and bug items to the project. User can also update/edit items parent, assignee, status, tags, etc.',
    type: 'project',
    tags: ['mern', 'mongodb', 'bootstrap', 'typescript', 'express.js', 'react.js']
  },
  {
    _id: '101',
    name: 'Simple Weather',
    description: 'A single page progressive web app that shows current weather info. The application can provide weather information of searched cities or user current location.',
    type: 'project',
    tags: ['pwa', 'ux', 'dark theme', 'api']
  },
  {
    name: 'Personal Website',
    description: 'A website that shows my project portfolio.',
    type: 'project',
    tags: ['resume', 'projects', 'portfolio', 'react.js']
  },
  {
    name: 'Machine Learning',
    description: 'A new project.',
    type: 'project',
    tags: []
  }
];

export default projectSeed;
