import styles from '../styles/NotFound.module.css'
const NotFound = () => {
    return ( 
        <>
            <div className="top">
  <h1>404</h1>
  <h3>page not found</h3>
</div>
<div className={styles.container}>
  <div className={styles["ghost-copy"]}>
    <div className={styles.one}></div>
    <div className={styles.two}></div>
    <div className={styles.three}></div>
    <div className={styles.four}></div>
  </div>
  <div className={styles.ghost}>
    <div className={styles.face}>
      <div className={styles.eye}></div>
      <div className={styles["eye-right"]}></div>
      <div className={styles.mouth}></div>
    </div>
  </div>
  <div className={styles.shadow}></div>
</div>
        </>
     );
}
 
export default NotFound;