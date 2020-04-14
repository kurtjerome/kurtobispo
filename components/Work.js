import Head from "next/head"
import Link from "next/link"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import Header from "./Header"
import styles from "./Work.module.css"

function Work({ work, before, after }) {
  const rendered = documentToReactComponents(work.content, options)

  return (
    <>
      <Head>
        <title>{work.name} | Kurt Obispo</title>
      </Head>
      <Header />
      <div className={styles.work}>
        <div className={styles.info}>
          <div className={styles.infoSticky}>
            <Link href="/works">
              <a className={styles.worksLink}>&larr; Show other projects</a>
            </Link>
            <h1 className={styles.name}>{work.name}</h1>
            <a
              href={work.website}
              target="_blank"
              rel="noopener"
              className={styles.visit}
            >
              Visit Site
            </a>
            <div className={styles.tags}>
              {work.tech.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.content}>{rendered}</div>
      </div>
      <div className={styles.otherWorks}>
        <p className={styles.checkOut}>Check out my other projects</p>
        <div className={styles.beforeAfter}>
          {before && <OtherWork work={before} />}
          {after && <OtherWork work={after} />}
        </div>
      </div>
    </>
  )
}

function OtherWork({ work }) {
  return (
    <div className={styles.otherWork}>
      <Link href="/works/[slug]" as={`/works/${work.slug}`}>
        <a className={styles.otherCoverLink}>
          <img
            src={`${work.cover.url}?fm=jpg&w=800`}
            alt={work.cover.title}
            className={styles.otherCover}
            loading="lazy"
          />
        </a>
      </Link>
      <h3>
        <Link href="/works/[slug]" as={`/works/${work.slug}`}>
          <a className={styles.otherName}>{work.name}</a>
        </Link>
      </h3>
      <p className={styles.otherTech}>{work.tech.join(", ")}</p>
    </div>
  )
}

export default Work

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <img
          src={node.data.target.fields.file.url}
          alt={node.data.target.fields.title}
        />
      )
    },
  },
}
