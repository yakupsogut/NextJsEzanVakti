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
        <div className="container">
            <h1 className="title">Şehirler</h1>
        <hr></hr>
          {cities.map((city) => (
            
              <Link href="/city/[slug]" as={`/city/${slug(city.sehirAdi)}-${city.sehirID}`}>
                <button key={city.sehirID} className="btn btn-dark btn-block m-1">{city.sehirAdi}</button>
              </Link>
          ))}
        
        </div>
      
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