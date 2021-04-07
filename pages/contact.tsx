import Link from "next/link";
import Layout from "../components/layout";

export default function Contact() {
  return (
    <Layout>
      <h2 className="text-3xl mt-14 mb-7 font-medium">Contact</h2>
      <p className="max-w-prose text-xl space-y-7">Here are a couple of reasons to contact me.</p>
      <ol className="max-w-prose text-xl">
        <li>If I know who you are and what you do, I can help connect you to other people and pass opportunities your way.</li>
        <li>I like meeting people online and learning what you do.</li>
      </ol>
      <p className="max-w-prose text-xl space-y-7">I'd like to hear from you, so please email me at <Link href="mailto:dlo@davidlopez.dev"><a className="text-blue-600 hover:text-blue-800 duration-200">dlo@davidlopez.dev</a></Link>.</p>
    </Layout>
  )
}