import { useEffect } from 'react';
import { useRouter } from 'next/router';

function useRequireAuth() {
  const router = useRouter();
  useEffect(() => {
    const isAuth = window.localStorage.getItem('isAuth');
    if (!isAuth) {
      router.push('/');
    }
  }, []);
}

export default useRequireAuth;
