import Layout from "../components/layout"
import Head from "next/head"
import Link from 'next/link'
import unfetch from "isomorphic-unfetch"
import slug from "slug"

function HomePage({cities}) {
    return (
      <Layout>
        <Head>
          <title>Anasayfa</title>
        </Head>
        <h1 className="title">Welcome to Next.js!</h1>
        <ul>
          {cities.map((city) => (
            <li key={city.sehirID}>
              <Link href="/city/[slug]" as={`/city/${slug(city.sehirAdi)}-${city.sehirID}`}>
                <a>{city.sehirAdi}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
  export async function getStaticProps() {
    //data fetch
    const data =await unfetch('https://namaz-vakti-api.herokuapp.com/cities?country=2')
    const cities=await data.json()
    //console.log(cities)
    return {
      props: {
        cities
      },
    }
  }
export default HomePage