import Work from "../../components/Work"

function WorkPage({ work }) {
  return <Work work={work} />
}

export default WorkPage

export async function getStaticPaths() {
  const client = require("contentful").createClient({
    space: process.env.contentfulSpaceId,
    accessToken: process.env.contentfulAccessToken,
  })

  const entries = await client.getEntries({
    content_type: "work",
  })

  const paths = entries.items.map((entry) => `/works/${entry.fields.slug}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const client = require("contentful").createClient({
    space: process.env.contentfulSpaceId,
    accessToken: process.env.contentfulAccessToken,
  })

  const works = await client.getEntries({
    content_type: "work",
    "fields.slug": params.slug,
  })

  const work = {
    name: works.items[0].fields.name,
    content: works.items[0].fields.content,
    website: works.items[0].fields.website,
    tech: works.items[0].fields.tech,
  }

  return {
    props: { work },
  }
}
