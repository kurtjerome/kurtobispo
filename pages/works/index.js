import Works from "../../components/Works"

function WorksPage({ works }) {
  return <Works works={works} />
}

export default WorksPage

export async function getStaticProps(_context) {
  const client = require("contentful").createClient({
    space: process.env.contentfulSpaceId,
    accessToken: process.env.contentfulAccessToken,
  })

  const entries = await client.getEntries({
    content_type: "work",
  })

  const works = entries.items.map((entry) => ({
    name: entry.fields.name,
    slug: entry.fields.slug,
    tech: entry.fields.tech,
  }))

  return {
    props: { works },
  }
}
