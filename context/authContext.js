import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {

  const [currentUser, setCurrentUser] = useState("Tal Rozenblat");
  
  return (
    <AuthContext.Provider
      value={ [currentUser, setCurrentUser]}
    >
      {" "}
      {children}
    </AuthContext.Provider>

    
  );



}