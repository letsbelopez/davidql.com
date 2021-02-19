import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <Head>
        <title>David Lopez - Software Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="text-4xl font-bold mt-14">
          <Link href="/">
            <a>David Lopez</a>
          </Link>
        </h1>
      </header>
      <main>
        <h2 className="text-3xl mt-14 mb-7 font-medium">About me</h2>
        <div className="max-w-prose text-xl space-y-7">
          <p>Welcome to my hand built personal website. Read about how I made it.</p>
          <p>In the past I've been a coffee roaster, beverage industry entreprenuer, and e-commerce entreprenuer. The most successful was my e-commerce website which made a few million in annual sales.</p>
          <p>Now I'm a software developer. I'm self taught. I started programming because I wanted an e-commerce website to make money online. When I moved on from e-commerce, I decided to go deep into programming. I signed up for classes, and 11 months later, I was a software engineer at Microsoft.</p>
          <p>Want to know more or just have a chat? Please <Link href="/contact"><a className="text-blue-600 hover:text-blue-800 duration-200">contact me</a></Link>.</p>
        </div>
        <h2 className="text-3xl mt-14 mb-7 font-medium">Recent Work Projects</h2>
        <ul className="max-w-prose text-xl">
          <li>
            <Link href="/"><a className="text-blue-600 hover:text-blue-800 duration-200">SynctUp - Cross Platform Mobile App</a></Link>
          </li>
          <li>
            <Link href="/"><a className="text-blue-600 hover:text-blue-800 duration-200">Ikonix USA - Enterprise Single Page App</a></Link>
          </li>
        </ul>
        <h2 className="text-3xl mt-14 mb-7 font-medium">Personal Projects</h2>
        <ul className="max-w-prose text-xl">
          <li>
            <Link href="/"><a className="text-blue-600 hover:text-blue-800 duration-200">Food Sensitivity Journal</a></Link>
          </li>
          <li>
            <Link href="/"><a className="text-blue-600 hover:text-blue-800 duration-200">XState - Introductory Course to State Machines</a></Link>
          </li>
        </ul>
      </main>
    </div>
  )
}
