import Head from 'next/head';
import Link from 'next/link';
import { logout } from '../lib/auth';

const Layout = ({ title, children, user }) => {
  const renderLinks = () => {
    if (user?.email) {
      return (
        <>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
          <button onClick={() => logout()}>Logout</button>
        </>
      );
    } else {
      return (
        <Link href="/login">
          <a>Login</a>
        </Link>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <span>
            Welcome <strong>{!user ? 'Guest!' : `${user.name}`}</strong>
          </span>
          <div>
            <Link href="/">
              <a>Home</a>
            </Link>
            {renderLinks()}
          </div>
        </nav>
      </header>
      <main>
        <h1>{title}</h1>
        {children}
      </main>
    </>
  );
};

export default Layout;
