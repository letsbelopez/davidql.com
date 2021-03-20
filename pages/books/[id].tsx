import Head from 'next/head'

import { getAllBookIds, getBookData } from '../../lib/posts'
import Layout from '../../components/layout'

export default function Book({ bookData }) {
  return (
    <Layout>
      <Head>
        <title>{bookData.title}</title>
      </Head>
      <h2 className="text-3xl mt-14 mb-7 font-medium">{bookData.title}</h2>
      <div className="markdown" dangerouslySetInnerHTML={{__html: bookData.contentHtml}} />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const bookData = await getBookData(params.id)
  return {
    props: {
      bookData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllBookIds()
  return {
    paths,
    fallback: false
  }
}
