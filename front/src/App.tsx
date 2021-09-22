import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Routes from './routes';

function App() {
  const [blackHeader, setBlackHeader] = useState(false);
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY >= 500) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  });

  return (
    <>
      {
        window.location.pathname === '/check' ||
          window.location.pathname === '/'
          ?
          <>
            <Navbar colorNav={blackHeader} />
            <Routes />
            <Footer />
          </>
          :
          <Routes />
      }
    </>
  );
}

export default App;
