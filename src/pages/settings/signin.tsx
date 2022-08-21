import type { NextPage } from 'next';
import LensLogin from '../../components/LensLogin/LensLogin';
import Head from '../../components/Utils/Head/Head';
import styles from '../../styles/Home.module.css';

const SignIn: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head title="Kauri.io - Sign-in" />
      <main className={styles.main}>
        <h1 className={styles.title}>Sign-in</h1>
        <LensLogin />
      </main>
    </div>
  );
};

export default SignIn;
