import React from 'react';

type DebugModeContextType = {
  debugMode: boolean;
  // setDebugMode: () => undefined;
}

const DebugModeContext = React.createContext({
  debugMode: false,
  toggle: () => {}
});

export default DebugModeContext;