import Link from "next/link"

import styles from "./Temp.module.css"

function Temp({ message }) {
  return (
    <div className={styles.tempContainer}>
      <img src="/logo.png" className={styles.logo} alt="Kurt's logo" />
      <p className={styles.message}>{message}</p>
      <Link href="/">
        <a className={styles.back}>&larr; Back Home</a>
      </Link>
    </div>
  )
}

export default Temp
