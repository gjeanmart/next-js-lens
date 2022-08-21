import Link from 'next/link';
import styles from '../../styles/Header.module.css';
import { useLensLogin, useLensLogout } from '../../utils/useLensLogin';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import Loading from '../Utils/Loading/Loading';

const path = [
  {
    uid: 21,
    name: 'Home',
    id: 1,
    path: '/',
    show: (_isConnected: boolean) => true,
  },
  {
    uid: 31,
    name: 'Sign-in',
    id: 2,
    path: '/settings/signin',
    show: (isConnected: boolean) => !isConnected,
  },
  {
    uid: 41,
    name: 'My Profile',
    id: 3,
    path: '/profile/my',
    show: (isConnected: boolean) => isConnected,
  },
  {
    uid: 51,
    name: 'My Publications',
    id: 4,
    path: '/publications/my',
    show: (_isConnected: boolean) => true,
  },
];

function NavItem(props: any) {
  const { value, isConnected } = props;

  if (value.show(isConnected)) {
    return (
      <li key={value.uid}>
        <Link href={value.path}>
          <a> {value.name} </a>
        </Link>
      </li>
    );
  } else {
    return <></>;
  }
}

export default function Header() {
  const lensLogin = useLensLogin();
  const { logout } = useLensLogout();

  if (!lensLogin) {
    return <Loading />;
  }

  return (
    <header className={styles.flex_space_between}>
      <nav>
        <ul>
          {path.map((value) => {
            return (
              <NavItem
                key={value.id}
                value={value}
                isConnected={lensLogin.isConnected}
              />
            );
          })}
          {lensLogin.isConnected && (
            <li>
              <a href="" role="button" onClick={logout}>
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
      <ConnectWallet />
    </header>
  );
}
