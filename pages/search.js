import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import Header from '@/components/Header'
import InfoCard from '@/components/InfoCard'

function search({ searchResults }) {
  console.log(searchResults)
  const router = useRouter()
  console.log(router.query)
  const { location, startDate, endDate, guests } = router.query
  const range = `${startDate} ${endDate ? `- ${endDate}` : ''}`
  return (
    <Layout>
      <Header placeholder={`${location} | ${range} | ${guests} guests`} />
      <section className="flex-grow px-6 relative my-8">
        <p className="text-sm">
          300+ stays {range} {guests > 0 ? `- ${guests} guests` : ''}
        </p>
        <h1 className="text-3xl font-semibold mt-2 mb-6">
          Stays in {location}{' '}
        </h1>

        <div className="hidden lg:inline-flex gap-3 text-gray-800 whitespace-nowrap pb-5">
          <p className="button">Cancelation Flexibility</p>
          <p className="button">Type of place</p>
          <p className="button">Price</p>
          <p className="button">Rooms and Beds</p>
          <p className="button">Services</p>
        </div>

        <div className="flex flex-col">
          {searchResults.map(
            ({ img, location, title, description, star, price, total }) => (
              <InfoCard
                key={img}
                img={img}
                description={description}
                title={title}
                location={location}
                star={star}
                price={price}
                total={total}
              />
            )
          )}
        </div>
      </section>
    </Layout>
  )
}

export default search

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )
  return {
    props: {
      searchResults,
    },
  }
}
