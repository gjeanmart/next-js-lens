import type { NextPage } from 'next';
import GetLensProfile from '../../components/LensProfile/LensGetProfile';
import Head from '../../components/Utils/Head/Head';
import styles from '../../styles/Home.module.css';

const MyProfile: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head title="Kauri.io - My Profile" />

      <main className={styles.main}>
        <h1 className={styles.title}>My Profile</h1>
        <GetLensProfile />
      </main>
    </div>
  );
};

export default MyProfile;
