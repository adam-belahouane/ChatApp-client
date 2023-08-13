import React from 'react';
import Login from './pages/Login';
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './pages/Dashboard';
import ContactsProvider from './Contexts/ContactsProvider';
import { ConversationsProvider } from './Contexts/ConversationsProvider';



function App() {
  const [id, setId] = useLocalStorage('id', null)

  const dashboard = (

    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>

  )

  return (
    id ? dashboard : <Login setId={setId} />
  )
}

export default App;
