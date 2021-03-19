import Link from 'next/link'
import Head from 'next/head'

export const siteTitle = 'David Lopez - Software Developer'

export default function Layout({ children, home = false }) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="David Lopez is a software engineer at AWS."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <h1 className="text-4xl font-bold mt-14">
          {home ? (
            'David Lopez'
            ) : (
            <Link href="/">
              <a>David Lopez</a>
            </Link>
          )}
        </h1>
      </header>
      <main>{children}</main>
    </div>
  )
}