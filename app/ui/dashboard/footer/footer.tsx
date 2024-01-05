import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Czech Coder</div>
      <div className={styles.text}>@ 2023 All Rights Reserver</div>
    </div>
  );
};
export default Footer;
