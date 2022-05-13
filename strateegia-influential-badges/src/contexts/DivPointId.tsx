// import * as React from "react";

// interface ContextState {
//   id: string | null;
// }

// const AppCtx = React.createContext({} as ContextState)


// // Provider in your app

// const sampleAppContext: ContextState = {
//   id: localStorage.getItem('usersScore')
// };

// export const DivPointId = () => (
//   <AppCtx.Provider value={sampleAppContext}>...</AppCtx.Provider>
// );

import { createContext, useContext } from "react"

export type GlobalContent = {
  id: string | null
  setId:(c: string | null) => void
};

export const DivPointId = createContext<GlobalContent>({
  id: localStorage.getItem('pointId'), // set a default value
  setId: () => {},
});

export const useGlobalContext = () => useContext(DivPointId);