import 'dotenv/config'
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Routes from './routes/routes';
import FadeIn from 'react-fade-in';

function App() {
  const [blackHeader, setBlackHeader] = useState(false);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setSpin(false);
  }, []);

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
      <ToastContainer />
      {
        !spin &&
        <>
          {
            window.location.pathname === '/check' ||
              window.location.pathname === '/'
              ?
              <>
                <Navbar colorNav={blackHeader} />
                <FadeIn>
                  <Routes />
                  <Footer />
                </FadeIn>
              </>
              :
              <Routes />
          }
        </>
      }
    </>
  );
}

export default App;
