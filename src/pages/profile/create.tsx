import type { NextPage } from 'next';
import Head from '../../components/Utils/Head/Head';
import styles from '../../styles/Home.module.css';

const CreateProfile: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head title="Kauri.io - Create Profile" />

      <main className={styles.main}>
        <h1 className={styles.title}>Create Profile</h1>
        <div>...</div>
      </main>
    </div>
  );
};

export default CreateProfile;
