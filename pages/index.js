import Head from "next/head"

import Home from "../components/Home"
import getOgImage from "../utils/getOgImage"

function HomePage() {
  const ogImage = getOgImage(`Hi, I'm **Kurt**!`)

  return (
    <>
      <Head>
        <title>Kurt Obispo</title>
        <meta property="og:title" key="og:title" content="Kurt Obispo" />
        <meta
          property="og:description"
          key="og:description"
          content="I'm a Web Developer who loves using React, GraphQL, Gatsby, and Next.js"
        />
        <meta property="og:image" content={ogImage} />
      </Head>
      <Home />
    </>
  )
}

export default HomePage
