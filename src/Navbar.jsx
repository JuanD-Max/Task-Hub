// src/components/Navbar.jsx
import { motion } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';
import './Navbar.css';

function Navbar({ darkMode, toggleTheme }) {
  return (
    <motion.nav
      className={`navbar ${darkMode ? 'dark' : 'light'}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="logo">
        <Zap size={28} style={{ marginRight: '0.5rem' }} />
        <h1>Task Hub</h1>
      </div>
      <button onClick={toggleTheme}>
        {darkMode ? (
          <>
            Modo Claro <Sun size={18} style={{ marginLeft: '0.5rem' }} />
          </>
        ) : (
          <>
            Modo Oscuro <Moon size={18} style={{ marginLeft: '0.5rem' }} />
          </>
        )}
      </button>
    </motion.nav>
  );
}

export default Navbar;