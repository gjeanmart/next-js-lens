import styles from "../../styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.SidebarCard}>
      <h2> Sidebar</h2>
      <div className={styles.sidebarTag}>
        <p> JavaScript </p>
        <p> Python </p>
        <p> HTML </p>
        <p> CSS </p>
      </div>
    </aside>
  );
}
