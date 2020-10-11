import React from 'react';

const DebugModeContext = React.createContext({
  debugMode: false,
  toggle: () => {}
});

export default DebugModeContext;