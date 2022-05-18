// import React from "react";

// export const AuthContext = React.createContext({});

// export function AuthProvider(props: { children: React.ReactNode }) {
//   const [apiToken, setApiToken] = React.useState<string>('');
//   const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

//   React.useEffect(() => {
//     console.log(apiToken)
//   }, [apiToken])

//   const authContextValue = {
//     apiToken,
//     isAuthenticated,
//     setApiToken,
//     setIsAuthenticated,
//   };

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// }

// interface AuthContextType {
//   apiToken: string;
//   isAuthenticated: boolean;
//   setApiToken: (apiToken: string) => void;
//   setIsAuthenticated: (isAuthenticated: boolean) => void;
// }

// export const useAuth = () => React.useContext(AuthContext) as AuthContextType;


import React, { createContext } from 'react';

interface IProps {
  children: React.ReactNode
};

interface AuthContextData {
  signed: boolean;
  apiToken: string | null;
  setApiToken: React.Dispatch<string | null>;
  auth(username: string, password: string ): Promise<void | string>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: IProps ) => {
  const [apiToken, setApiToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storagedToken = localStorage.getItem('strateegiaAccessToken');

    if (storagedToken) {
      setApiToken(storagedToken);
    }
  }, [apiToken]);

  async function auth(username: string, password: string) {
    const base64Login = btoa(`${username}:${password}`);

    const response = await fetch(`https://api.strateegia.digital/users/v1/auth/signin`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Login}`
        }
    });

    const data = await response.json();
    setApiToken(data.access_token);
    localStorage.setItem('strateegiaAccessToken', data.access_token);
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(apiToken), apiToken, auth, setApiToken }}>
      {children}
    </AuthContext.Provider>
  )

}

export function useAuth(){
  const context = React.useContext(AuthContext);
 
  return context;
}
