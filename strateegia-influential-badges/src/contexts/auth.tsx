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

    if (storagedToken === apiToken) {
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
    console.log(data)
    setApiToken(data.access_token);
    localStorage.setItem('strateegiaAccessToken', data.access_token);
    return data.access_token;
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
