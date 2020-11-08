import Layout from '../components/Layout';

export default function Home({ user }) {
  return (
    <Layout title="Home" user={user}>
      <div>Home</div>
    </Layout>
  );
}
