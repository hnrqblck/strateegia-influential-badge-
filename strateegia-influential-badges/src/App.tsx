import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { DivPointId } from './contexts/DivPointId';

function App() {
  const [id, setId] = React.useState<string | null>(localStorage.getItem('pointId'));
  return (
    <div className="App">
      <DivPointId.Provider value= {{ id, setId }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      </DivPointId.Provider>
    </div>
  );
}

export default App;
