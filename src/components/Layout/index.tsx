import Footer from './Footer';
import Header from './Header';
import SideBar from './Sidebar';

const styles:any = {
    display : "flex",
    flexDirection: "row"
  };

export default function Layout(props: any) {
  return (
    <>
      <Header />
      <main style={styles}>
        <section style={{ width: '1024px' }}>{props.children}</section>
        <SideBar />
      </main>
      <Footer />
    </>
  );
}
