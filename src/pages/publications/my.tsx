import type { NextPage } from 'next';
import Head from '../../components/Utils/Head/Head';
import styles from '../../styles/Home.module.css';

const MyPublications: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head title="Kauri.io - My Publications" />

      <main className={styles.main}>
        <h1 className={styles.title}>My Publications</h1>
        <div>...</div>
      </main>
    </div>
  );
};

export default MyPublications;
