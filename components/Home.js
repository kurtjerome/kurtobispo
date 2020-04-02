import Link from "next/link"

import styles from "./Home.module.css"

function Home() {
  return (
    <div className={styles.hero}>
      <img src="/logo.png" className={styles.logo} />

      <div className={styles.nameTitle}>
        <h1 className={styles.name}>Kurt Obispo</h1>
        <h2 className={styles.title}>Software Engineer</h2>
      </div>

      <p className={styles.spiel}>
        I’m a web developer with 7 years of experience building web apps with{" "}
        <strong>React</strong>, <strong>Node</strong>, and <strong>PHP</strong>.
        Lately, I’ve been focusing on frontend development using{" "}
        <strong>Gatsby</strong>, <strong>Next.js</strong> and{" "}
        <strong>GraphQL</strong>.
      </p>

      <div>
        <Link href="/work">
          <a className={styles.work}>Look at my work &rarr;</a>
        </Link>
        <Link href="/contact">
          <a className={styles.contact}>Contact me</a>
        </Link>
      </div>
    </div>
  )
}

export default Home
