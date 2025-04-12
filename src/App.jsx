import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Taskboard from './Taskboard';
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(()=>{
    const savedTheme = localStorage.getItem('tema');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });
  useEffect(()=>{
    localStorage.setItem('tema', JSON.stringify(darkMode));
  }, [darkMode]);
  const toggleTheme = () => setDarkMode(!darkMode);
  return(
    <div className={darkMode ? 'app dark':'app light'}>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme}/>
        <Taskboard />
    </div>
  );
}

export default App
