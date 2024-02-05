import React, { useState } from 'react';
import './App.css'
import MainHeader from './components/MainHeader'
import NotesList from './components/Notes/NotesList'
import Login from './components/Login/Login'


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <div className='container'>
          <MainHeader user={user} onLogout={handleLogout} />
          <NotesList />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  )

}

export default App