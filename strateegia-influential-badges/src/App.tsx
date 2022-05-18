import React from 'react';
import Routes from './routes/index';
import { DivPointId } from './contexts/DivPointId';
import { AuthProvider } from './contexts/auth';

function App() {
  const [id, setId] = React.useState<string | null>(localStorage.getItem('pointId'));
  return (
    <div className="App">
      <AuthProvider>
        <DivPointId.Provider value= {{ id, setId }}>
          <Routes />
        </DivPointId.Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
