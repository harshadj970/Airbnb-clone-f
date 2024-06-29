import { createContext, useState } from "react";

export const UserContext=createContext({});

export const UserContextProvider=({children})=>{
  const [user,setUser]=useState();
  const [ready,setReady]=useState(false);
  return<>
  <UserContext.Provider value={{user,setUser,ready,setReady}}>
    {children}
  </UserContext.Provider>
  </>
}