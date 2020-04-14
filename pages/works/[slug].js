import Work from "../../components/Work"

function WorkPage(props) {
  return <Work {...props} />
}

export default WorkPage

export async function getStaticPaths() {
  const contentful = require("contentful").createClient({
    space: process.env.contentfulSpaceId,
    accessToken: process.env.contentfulAccessToken,
  })

  const entries = await contentful.getEntries({
    content_type: "work",
  })

  const paths = entries.items.map((entry) => `/works/${entry.fields.slug}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const contentful = require("contentful").createClient({
    space: process.env.contentfulSpaceId,
    accessToken: process.env.contentfulAccessToken,
  })

  const work = await getWork(contentful, {
    content_type: "work",
    "fields.slug": params.slug,
  })

  const [before, after] = await getBeforeAfter(contentful, work.rank)

  return {
    props: { work, before, after },
  }
}

async function getWork(contentful, query) {
  const contentfulWork = await contentful
    .getEntries(query)
    .then(({ total, items }) => (total > 0 ? items[0] : null))

  if (!contentfulWork) {
    return null
  }

  return {
    name: contentfulWork.fields.name,
    content: contentfulWork.fields.content,
    website: contentfulWork.fields.website,
    tech: contentfulWork.fields.tech,
    rank: contentfulWork.fields.rank,
  }
}

async function getBeforeAfter(contentful, rank) {
  const twoBeforePromise = contentful.getEntries({
    content_type: "work",
    limit: 2,
    order: "-fields.rank",
    "fields.rank[lt]": rank,
  })

  const twoAfterPromise = contentful.getEntries({
    content_type: "work",
    limit: 2,
    order: "fields.rank",
    "fields.rank[gt]": rank,
  })

  const [twoBefore, twoAfter] = await Promise.all([
    twoBeforePromise,
    twoAfterPromise,
  ])

  let beforeAfter = []

  if (twoBefore.total > 0 && twoAfter.total > 0) {
    beforeAfter = [twoBefore.items[0], twoAfter.items[0]]
  } else if (twoBefore.total === 0) {
    beforeAfter = [...twoAfter.items]
  } else {
    beforeAfter = [...twoBefore.items]
  }

  return beforeAfter.map((contentfulWork) => ({
    name: contentfulWork.fields.name,
    tech: contentfulWork.fields.tech,
    slug: contentfulWork.fields.slug,
    cover: {
      url: contentfulWork.fields.cover.fields.file.url,
      title: contentfulWork.fields.cover.fields.title,
    },
  }))
}
