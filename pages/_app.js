import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { getUserProfile } from '../lib/auth';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const props = {
    ...pageProps,
    ...user,
  };

  useEffect(() => {
    getUserProfile().then((user) => setUser(user));
  }, []);

  return <Component {...props} />;
}

export default MyApp;
