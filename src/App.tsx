import React from 'react';
import Login from './pages/Login';
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './pages/Dashboard';



function App() {
  const [id, setId] = useLocalStorage('id' , null)

  return (
    id ? <Dashboard id={id}/> : <Login setId={setId} />
  )
}

export default App;
