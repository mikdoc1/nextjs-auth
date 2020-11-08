import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { login } from '../lib/auth';

const LoginForm = () => {
  const router = useRouter();
  const [formVal, setFormVal] = useState({
    email: 'Sincere@april.biz',
    password: 'hildegard.org',
    error: '',
    isLoading: false,
  });
  const onChange = (e) => {
    setFormVal((pS) => ({
      ...pS,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setFormVal((pS) => ({
      ...pS,
      error: '',
      isLoading: true,
    }));

    login(formVal)
      .then(() => {
        window.location.replace('/profile');
      })
      .catch((err) => {
        const error = (err.response && err.response.data) || err.message;
        setFormVal((pS) => ({
          ...pS,
          error,
          isLoading: false,
        }));
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="email" placeholder="email" name="email" onChange={onChange} value={formVal.email} />
      </div>
      <div>
        <input type="password" placeholder="password" name="password" onChange={onChange} value={formVal.password} />
      </div>
      <button type="submit" disabled={formVal.isLoading}>
        {formVal.isLoading ? 'Sending' : 'Submit'}
      </button>
      {formVal.error && <div>{formVal.error}</div>}
    </form>
  );
};

export default LoginForm;
