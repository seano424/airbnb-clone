import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import { v4 as uuidv4 } from 'uuid'
import SmallCard from '@/components/SmallCard'
import MediumCard from '@/components/MediumCard'
import LargeCard from '@/components/LargeCard'
import Footer from '@/components/Footer'

export default function Home({ exploreData, cardsData }) {
  console.log(cardsData)
  return (
    <div className="">
      <Head>
        <title>Airbnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* Pull exploreData from server - API endpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData.map((item) => (
              <SmallCard
                key={uuidv4()}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex overflow-scroll space-x-3 scrollbar-hide p-3 -ml-3">
            {cardsData.map((item) => (
              <MediumCard key={uuidv4()} img={item.img} title={item.title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch(
    'http://localhost:3000/api/explore-data'
  ).then((res) => res.json())

  const cardsData = await fetch('http://localhost:3000/api/cards-data').then(
    (res) => res.json()
  )

  return {
    props: {
      exploreData,
      cardsData,
    },
  }
}
