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