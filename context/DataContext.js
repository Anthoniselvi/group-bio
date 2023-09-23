import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const userAuthContext = createContext();

export function ApiContextProvider({ children }) {
  const [membersList, setMembersList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/all`)
      .then((response) => {
        setMembersList(response.data);
        console.log("Data:" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        membersList,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
