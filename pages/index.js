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
            <li key={city.SehirID}>
              <Link href="/city/[slug]" as={`/city/${slug(city.SehirAdi)}-${city.SehirID}`}>
                <a>{city.SehirAdi}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
  export async function getStaticProps() {
    //data fetch
    const data =await unfetch('http://ezanvakti.herokuapp.com/sehirler/2')
    const cities=await data.json()
    //console.log(cities)
    return {
      props: {
        cities
      },
    }
  }
export default HomePage