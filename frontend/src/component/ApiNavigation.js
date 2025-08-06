import React,{createContext} from 'react'

export const AppContext=createContext();
const ApiNavigation=(props)=> {
 const contact="http://localhost:5000";

  return (
    <AppContext.Provider value={contact}>
      {props.children} {/* Correct way to render children */}
    </AppContext.Provider>
  );
}

export default ApiNavigation