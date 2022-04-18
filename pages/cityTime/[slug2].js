import Layout from "../../components/layout"
import Head from "next/head"
import unfetch from "isomorphic-unfetch"
import slug from "slug"
import Link from 'next/link'
import uniqid from "uniqid"
import axios from "axios"


function CityTimeDetail({id}) {

  const response=axios.get(`https://namaz-vakti-api.herokuapp.com/data?region=${id}`)
  /*const address = fetch(`https://namaz-vakti-api.herokuapp.com/data?region=${id}`)
  .then((response) => response.json())*/

const printAddress = async () => {
  const a = await (await response).data;
  console.log(a);
};

printAddress();


    return (
      <Layout>
        <Head>
          <title>Anasayfa</title>
        </Head>
          
      </Layout>
    )
  }
  export async function getStaticPaths() {
    const data = await unfetch('https://namaz-vakti-api.herokuapp.com/regions?city=539')
    const ilceler = await data.json()
  
    const paths = ilceler.map(ilce => {
      return { params: { slug2: `${slug(ilce.IlceAdi)}-${ilce.IlceID}` } }
    })
  
    return {
      paths,
      fallback: true
    }
  }
  
  export async function getStaticProps({params}) {
    //data fetch
   // console.log(params.slug)
    const id=params.slug2.split("-").slice(-1)[0]
    const data =await unfetch(`https://namaz-vakti-api.herokuapp.com/data?region=${id}`)
    const vakitler=await data.json()
    //console.log(character);
    return {
      props: {
        id
      },
    }
  }
export default CityTimeDetail