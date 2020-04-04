import Link from "next/link"

import styles from "./Header.module.css"

function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.home}>
          <img src="/logo.png" className={styles.logo} alt="Kurt's logo" />
          <strong className={styles.name}>
            Kurt <span>Obispo</span>
          </strong>
        </a>
      </Link>
    </div>
  )
}

export default Header
