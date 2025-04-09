import { useState } from 'react'
import Navbar from './Navbar'
import Taskboard from './Taskboard';
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(!darkMode);
  return(
    <div className={darkMode ? 'app dark':'app light'}>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme}/>
        <Taskboard />
    </div>
  );
}

export default App
