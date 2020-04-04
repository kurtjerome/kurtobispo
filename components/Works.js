import Head from "next/head"
import Link from "next/link"

import Header from "./Header"
import styles from "./Works.module.css"

function Works({ works }) {
  return (
    <>
      <Head>
        <title>Works | Kurt Obispo</title>
      </Head>
      <Header />
      <div className={styles.works}>
        <p className={styles.intro}>
          Here's a selection of my projects focused on web development. Spoiler
          alert, I love using <strong>React</strong> and{" "}
          <strong>GraphQL</strong>.
        </p>
        <div className={styles.grid}>
          {works.map((work) => (
            <div key={work.slug} className={styles.work}>
              <Link href="/works/[slug]" as={`/works/${work.slug}`}>
                <a className={styles.coverLink}>
                  <img
                    src={`${work.cover.url}?fm=jpg&w=816`}
                    alt={work.cover.title}
                    className={styles.cover}
                    loading="lazy"
                  />
                </a>
              </Link>
              <h3>
                <Link href="/works/[slug]" as={`/works/${work.slug}`}>
                  <a className={styles.name}>{work.name}</a>
                </Link>
              </h3>
              <p className={styles.tech}>{work.tech.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Works