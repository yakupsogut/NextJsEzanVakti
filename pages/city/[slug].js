import Layout from "../../components/layout"
import Head from "next/head"
import unfetch from "isomorphic-unfetch"
import slug from "slug"
import Link from 'next/link'

function CityDetail({city,cityInfo}) {
  console.log(cityInfo)
    return (
      <Layout>
        <Head>
          <title>Anasayfa</title>
        </Head>
          <h1 className="title">{cityInfo[0].sehirAdi}</h1>
          <hr></hr>
          {city.map((ilce) => (
            
              <Link key={ilce.IlceID} href="/cityTime/[slug2]" as={`/cityTime/${slug(ilce.IlceAdi)}-${ilce.IlceID}`}>
                <button className="btn btn-dark btn-block m-1">{ilce.IlceAdi}</button>
              </Link>
            
          ))}
        

      
      </Layout>
    )
  }
  export async function getStaticPaths() {  
    const data = await unfetch('https://namaz-vakti-api.herokuapp.com/cities?country=2')
    const cities = await data.json()
  
    const paths = cities.map(city => {
      return { params: { slug: `${slug(city.sehirAdi)}-${city.sehirID}`} }
    })
  
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({params}) {
    //data fetch
    console.log(params)
    const id=params.slug.split("-").slice(-1)[0]
    const data =await unfetch(`https://namaz-vakti-api.herokuapp.com/regions?city=${id}`)
    const dataCity=await unfetch(`https://namaz-vakti-api.herokuapp.com/cities?country=2`)
    const cityJson=await dataCity.json()
    const cityInfo=cityJson.filter(city => city.sehirID ==id)
    const city=await data.json()
    //console.log(character);
    return {
      props: {
        city,
        cityInfo
      },
    }
  }
export default CityDetail