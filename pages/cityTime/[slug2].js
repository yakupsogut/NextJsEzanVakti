import Layout from "../../components/layout"
import Head from "next/head"
import unfetch from "isomorphic-unfetch"
import slug from "slug"
import Link from 'next/link'
import uniqid from "uniqid"
import axios from "axios"


function CityTimeDetail({vakitler}) {
/*console.log(id);
const response=axios.get(`https://namaz-vakti-api.herokuapp.com/data?region=${id}`)
  

const printAddress = async () => {
  const a = await (await response).data;
  //console.log(a[0])
  return a;
};*/
//printAddress()
/*const ssa=printAddress();*/

/*const printAddress = async () => {
  const a = vakitler;
  return a;
};
console.log(printAddress())*/
 /* const response=axios.get(`https://namaz-vakti-api.herokuapp.com/data?region=${id}`)
  

const printAddress = async () => {
  const a = await (await response).data;
  return <div>{a[0][0]}</div>
};
const ssa=printAddress();*/
//const yeni=vakitler[0]
    return (
      <Layout>
        <Head>
          <title>Anasayfa</title>
        </Head>
        <div>
          
        {vakitler[0]}
            
          
        </div>
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
        vakitler
      },
    }
  }
export default CityTimeDetail