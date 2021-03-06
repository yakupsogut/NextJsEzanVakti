import Layout from "../../components/layout"
import Head from "next/head"
import unfetch from "isomorphic-unfetch"
import slug from "slug"
import Link from 'next/link'
import uniqid from "uniqid"
import axios from "axios"
import Image from 'next/image'

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
/*const yeni=vakitler.map((vakit)=>{
  vakit.AyinSekliURL
})*/

    return (
      <Layout>
        <Head>
          <title>Anasayfa</title>
        </Head>
        <div className="table-responsive-lg">
          <table className="table table-hover table-striped">
            <thead className="thead-light">
              <tr>
                <th>Tarih</th>
                <th>İmsak</th>
                <th>Öğle</th>
                <th>İkindi</th>
                <th>Akşam</th>
                <th>Yatsi</th>
                <th>Ay</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(vakitler) &&
              vakitler.map((vakit) => {
                return (
                  <tr key={uniqid()}>
                    <td>{vakit.MiladiTarihUzun}</td>
                    <td>{vakit.Imsak}</td>
                    <td>{vakit.Ogle}</td>
                    <td>{vakit.Ikindi}</td>
                    <td>{vakit.Aksam}</td>
                    <td>{vakit.Yatsi}</td>
                    <td>
                      <figure>
                        <img src={vakit.AyinSekliURL} width={50}></img>
                        
                      </figure>
                    </td>
                  </tr>
                )
              })}
              </tbody>
          </table>
          
        </div>
        {!Array.isArray(vakitler) && (
          <h2>Diyanet Isleri Baskanligi servisine baglanilamiyor.</h2>
        )}
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
    const data =await unfetch(`http://ezanvakti.herokuapp.com/vakitler/${id}`)
    const vakitler=await data.json()
    //console.log(character);
    return {
      props: {
        vakitler
      },
    }
  }
export default CityTimeDetail