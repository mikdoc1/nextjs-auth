import Layout from '../components/Layout';
import useRequireAuth from '../hooks/useRequireAuth';

const Profile = ({ user }) => {
  useRequireAuth();
  return (
    <Layout title="Profile" user={user}>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
};

export default Profile;
