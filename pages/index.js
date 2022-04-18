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
        
            <h1 className="title">Şehirler</h1>
        <hr></hr>
          {cities.map((city) => (
            
              <Link  key={city.sehirID} href="/city/[slug]" as={`/city/${slug(city.sehirAdi)}-${city.sehirID}`}>
                <button className="btn btn-dark btn-block m-1">{city.sehirAdi}</button>
              </Link>
          ))}
        
        
      
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