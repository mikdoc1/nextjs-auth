import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

const Login = ({ user }) => {
  return (
    <div>
      <Layout title="Login" user={user}>
        <LoginForm />
      </Layout>
    </div>
  );
};

export default Login;
