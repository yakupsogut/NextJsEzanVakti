import Layout from "../../components/layout"
import Head from "next/head"
import unfetch from "isomorphic-unfetch"
import slug from "slug"
import Link from 'next/link'

function CityDetail({city}) {
    return (
      <Layout>
        <Head>
          <title>Anasayfa</title>
        </Head>
        <ul>
          {city.map((ilce) => (
            <li key={ilce.IlceID}>
              <Link href="/cityTime/[slug]" as={`/cityTime/${slug(ilce.IlceAdi)}-${ilce.IlceID}`}>
                <a>{ilce.IlceAdi}</a>
              </Link>
            </li>
          ))}
        </ul>

      
      </Layout>
    )
  }
  export async function getStaticPaths() {
    const data = await unfetch('http://ezanvakti.herokuapp.com/sehirler/2')
    const cities = await data.json()
  
    const paths = cities.map(city => {
      return { params: { slug: `${slug(city.SehirAdi)}-${city.SehirID}` } }
    })
  
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({params}) {
    //data fetch
   // console.log(params.slug)
    const id=params.slug.split("-").slice(-1)[0]
    const data =await unfetch(`http://ezanvakti.herokuapp.com/ilceler/${id}`)
    const city=await data.json()
    //console.log(character);
    return {
      props: {
        city
      },
    }
  }
export default CityDetail