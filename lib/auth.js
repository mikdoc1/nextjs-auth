import axios from 'axios';
import Router from 'next/router';

axios.defaults.withCredentials = true;

export const login = async ({ email, password }) => {
  const { data } = await axios.post('/api/login', { email, password });
  window.localStorage.setItem('isAuth', true);
};

export const logout = async () => {
  await axios.post('/api/logout');
  window.localStorage.removeItem('isAuth');
  window.location.replace('/login');
};

export const getUserProfile = async () => {
  const isAuth = window.localStorage.getItem('isAuth');
  if (isAuth) {
    const { data } = await axios.get('/api/profile');
    return data;
  }
  return null;
};
