import type { NextPage } from 'next';
import Head from '../components/Utils/Head/Head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head title="kauri.io" />

      <main className={styles.main}>
        <h1 className={styles.title}>Home</h1>

      </main>
    </div>
  );
};

export default Home;
