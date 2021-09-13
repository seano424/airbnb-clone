import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Airbnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Let's Build AIRBNB</h1>
    </div>
  )
}
